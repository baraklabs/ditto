const { getHighestPriorityMock } = require('./matchUtils');
const { callProxyHost } = require('../services/proxyService');

const handleMockResponse = async (matchingMocks, res) => {
    const sorted = getHighestPriorityMock(matchingMocks);
    const selected = sorted[0];

    if (selected.mock_type === 'Forward') {
        const proxyRes = await callProxyHost(selected);
        return res.status(proxyRes.status).set(proxyRes.headers).send(proxyRes.data);
    }

    const delay = selected.res_delay_ms || 0;
    const status = selected.res_status || 200;
    const headers = selected.res_header ? JSON.parse(selected.res_header) : {};
    const body = selected.res_body || null;

    if (headers && typeof headers === 'object') {
        Object.entries(headers).forEach(([key, value]) => {
            res.setHeader(key, value);
            console.log(`Set header: ${key} = ${value}`);
        });
    }

    setTimeout(() => {
        res.status(status).send(body);
    }, delay);
};

module.exports = {
    handleMockResponse,
};
