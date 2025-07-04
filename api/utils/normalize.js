function parseSafely(input) {
    if (input == null || input === '') return null;
    try {
        return JSON.parse(input);
    } catch {
        return input;
    }
}

function normalizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(normalizeObject);
    }

    return Object.keys(obj).sort().reduce((acc, key) => {
        acc[key] = normalizeObject(obj[key]);
        return acc;
    }, {});
}

function normalizeHeaders(headerStr) {
    if (!headerStr || typeof headerStr !== 'string') return '';
    return Object.entries(
        Object.fromEntries(
            headerStr.split('\n')
                .map(line => line.trim())
                .filter(Boolean)
                .map(line => {
                    const [key, ...rest] = line.split(':');
                    return [key.trim().toLowerCase(), rest.join(':').trim()];
                })
        )
    ).sort(([a], [b]) => a.localeCompare(b))
     .map(([k, v]) => `${k}: ${v}`)
     .join('\n');
}

function normalizeQuery(query) {
    if (!query) return '';
    const searchParams = new URLSearchParams(typeof query === 'string' ? query : query);
    return Array.from(searchParams.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
}

function deNormalizeHeaders(headerStr) {
  if (!headerStr || typeof headerStr !== 'string') return {};
    const lines = headerStr.split('\n');
    const headers = {};
    for (const line of lines) {
        const idx = line.indexOf(':');
        if (idx > 0) {
            const key = line.slice(0, idx).trim();
            const val = line.slice(idx + 1).trim();
            headers[key] = val;
        }
    }
    return headers;
}

module.exports = {
    parseSafely,
    normalizeObject,
    normalizeHeaders,
    normalizeQuery,
    deNormalizeHeaders
};
