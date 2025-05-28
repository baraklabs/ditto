function cleanHeaders(headerStr) {
    return (headerStr || '')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.includes(':'))
        .map(line => {
            const [key, ...rest] = line.split(':');
            return `${key.trim()}: ${rest.join(':').trim()}`;
        }).join('\n');
}

function cleanQueryParams(rawQuery) {
    if (!rawQuery) return '';
    return rawQuery.split('&').filter(Boolean).map(pair => {
        const [key = '', value = ''] = pair.split('=');
        return `${encodeURIComponent(decodeURIComponent(key))}=${encodeURIComponent(decodeURIComponent(value))}`;
    }).join('&');
}

function cleanBody(rawBody, contentType = '') {
    if (!rawBody) return '';
    const type = contentType.toLowerCase();

    try {
        if (type.includes('application/json')) {
            const obj = JSON.parse(rawBody);
            const trimStrings = o => {
                if (typeof o === 'string') return o.trim();
                if (Array.isArray(o)) return o.map(trimStrings);
                if (o && typeof o === 'object') {
                    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k.trim(), trimStrings(v)]));
                }
                return o;
            };
            return JSON.stringify(trimStrings(obj));
        }

        if (type.includes('application/x-www-form-urlencoded')) {
            const params = new URLSearchParams(rawBody);
            const cleaned = new URLSearchParams();
            for (const [k, v] of params) {
                cleaned.append(k.trim(), v.trim());
            }
            return cleaned.toString();
        }

        return rawBody.trim(); // fallback
    } catch {
        return rawBody;
    }
}

module.exports = {
    cleanHeaders,
    cleanQueryParams,
    cleanBody
};
