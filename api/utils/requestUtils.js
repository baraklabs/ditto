// utils/requestUtils.js

function extractRequestDetails(req) {
    return {
        req_method: req.method,
        req_path_param: req.originalUrl.split('?')[0],
        req_header: req.headers,
        req_body: req.body,
        req_query_param: req.query,
        cookies: req.cookies,
    };
}

function normalizeValue(value) {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string' && value.trim() === '') return null;
    if (typeof value === 'object' && Object.keys(value).length === 0) return null;
    return value;
}

function normalizeRequestData(data) {
    return {
        req_method: normalizeValue(data.req_method),
        req_path_param: normalizeValue(data.req_path_param),
        req_header: normalizeValue(data.req_header),
        req_body: normalizeValue(data.req_body),
        req_query_param: normalizeValue(data.req_query_param),
        cookies: normalizeValue(data.cookies),
    };
}

module.exports = {
    extractRequestDetails,
    normalizeValue,
    normalizeRequestData,
};
