const { callProxyHost } = require('../services/proxyService');
const { faker } = require('@faker-js/faker');
function getNestedProperty(obj, path) {
    if (!obj || !path) return undefined;

    const parts = path.split('.');
    let current = obj;

    for (let part of parts) {
        const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
        if (arrayMatch) {
            const key = arrayMatch[1];
            const index = parseInt(arrayMatch[2], 10);

            if (key === 'path') {
                const segments = current.req_path_param.split('/').filter(Boolean);
                current = segments[index];
            } else {
                if (!current[key] || !Array.isArray(current[key])) return undefined;
                current = current[key][index];
            }
        } else {
            if (!(part in current)) return undefined;
            current = current[part];
        }
        if (current === undefined || current === null) return current;
    }

    return current;
}

function evaluateTemplate(str, cleanedReq) {
    if (!str || typeof str !== 'string') return str;

    return str.replace(/{{\s*(faker\.([a-zA-Z0-9_.()]+)|req\.([a-zA-Z0-9_.\[\]0-9]+))\s*}}/g, (_, match, fakerPath, reqPath) => {
        try {
            if (fakerPath) {
                const cleanPath = fakerPath.replace(/\(\)/g, '');
                const fakerFn = cleanPath.split('.').reduce((obj, key) => obj[key], faker);
                if (typeof fakerFn === 'function') {
                    return fakerFn();
                }
            } else if (reqPath) {
                const val = getNestedProperty(cleanedReq, reqPath);
                if (val !== undefined && val !== null) {
                    return val;
                }
            }
        } catch (e) {
            console.error(`Failed to resolve template: ${_}`, e);
        }
        return '';
    });
}

function makeHeaders(headerStr, res, req) {
    if (!headerStr || typeof headerStr !== 'string') return;
    try {
        const lines = headerStr.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.includes(':')) continue;

            const [key, ...rest] = trimmed.split(':');
            const value = rest.join(':').trim();
            const resolvedValue = evaluateTemplate(value, req);

            res.setHeader(key.trim(), resolvedValue);
        }
    } catch (err) {
        console.error("Error parsing raw headers:", err);
    }
}


function makeBody(bodyStr, cleanedReq) {
    if (!bodyStr || typeof bodyStr !== 'string') return bodyStr;
    return evaluateTemplate(bodyStr, cleanedReq);
}

const handleMockResponse = async (selectedMock, cleanedReq, res) => {


    if (selectedMock.mock_type === 'Forward') {
        const proxyRes = await callProxyHost(selectedMock, cleanedReq);
        return res.status(proxyRes.status).set(proxyRes.headers).send(proxyRes.data);
    }

    const delay = selectedMock.res_delay_ms || 0;
    const status = selectedMock.res_status || 200;

    makeHeaders(selectedMock.res_header, res, cleanedReq);
    const body = makeBody(selectedMock.res_body, cleanedReq);

    setTimeout(() => {
        res.status(status).send(body);
    }, delay);
};

module.exports = {
    handleMockResponse,
};
