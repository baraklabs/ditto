const { normalizeObject, parseSafely, normalizeHeaders, normalizeQuery } = require("./normalize");
const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser({
    ignoreAttributes: false
});


function wildcardToRegex(pattern) {
    const escaped = pattern.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
    return new RegExp('^' + escaped.replace(/\*/g, '.*') + '$');
}

function matchPathParam(mock, reqReceived) {
    const mockPattern = mock.req_path_param;
    const actualPath = reqReceived.req_path_param;

    if (!mockPattern && !actualPath) return true; 
    if (!mockPattern || !actualPath) return false; 

    const regex = wildcardToRegex(mockPattern);
    return regex.test(actualPath);
}


function parseQueryString(queryString) {
    if (!queryString) return {};
    return Object.fromEntries(new URLSearchParams(queryString));
}

function matchQueryParam(mock, reqReceived) {
    const mockParams = parseQueryString(mock.req_query_param);
    const actualParams = parseQueryString(reqReceived.req_query_param);


    if (!mockParams && !actualParams) return true; 
    if (!mockParams || !actualParams) return false; 


    for (const [key, mockVal] of Object.entries(mockParams)) {
        const actualVal = actualParams[key];
        if (actualVal === undefined) return false; 
        const regex = wildcardToRegex(mockVal);
        if (!regex.test(actualVal)) return false; 
    }

    return true;
}
function matchWithWildcard(mockVal, actualVal) {
    if (typeof mockVal === 'string' && mockVal.includes('*')) {
        if (typeof actualVal !== 'string') return false;
        const regex = wildcardToRegex(mockVal);
        return regex.test(actualVal);
    }

    if (Array.isArray(mockVal) && Array.isArray(actualVal)) {
        if (mockVal.length !== actualVal.length) return false;
        for (let i = 0; i < mockVal.length; i++) {
            if (!matchWithWildcard(mockVal[i], actualVal[i])) return false;
        }
        return true;
    }

    if (typeof mockVal === 'object' && mockVal !== null &&
        typeof actualVal === 'object' && actualVal !== null) {
        const mockKeys = Object.keys(mockVal);
        const actualKeys = Object.keys(actualVal);

        if (mockKeys.length !== actualKeys.length) return false;

        for (const key of mockKeys) {
            if (!(key in actualVal)) return false;
            if (!matchWithWildcard(mockVal[key], actualVal[key])) return false;
        }
        return true;
    }

    // Fallback to strict equality
    return mockVal === actualVal;
}

function matchReqBody(mock, reqReceived) {
    const mockParsedRaw = parseSafely(mock.req_body);
    const reqParsedRaw = parseSafely(reqReceived.req_body);
    if ((!mockParsedRaw && !reqParsedRaw) || (!mockParsedRaw && !reqParsedRaw.length > 0)) return true; 
    if (!mockParsedRaw || !reqParsedRaw) return false; 

    // Try JSON first
    if (typeof mockParsedRaw === 'object' && mockParsedRaw !== null &&
        typeof reqParsedRaw === 'object' && reqParsedRaw !== null) {
        return matchWithWildcard(normalizeObject(mockParsedRaw), normalizeObject(reqParsedRaw));
    }

    // Try XML parsing
    try {
        const mockXMLParsed = parser.parse(mockParsedRaw);
        const reqXMLParsed = parser.parse(reqParsedRaw);

        if (typeof mockXMLParsed === 'object' && typeof reqXMLParsed === 'object') {
            return matchWithWildcard(normalizeObject(mockXMLParsed), normalizeObject(reqXMLParsed));
        }
    } catch (e) {
        // ignore XML parse errors
    }

    // Fallback: treat as text and do wildcard match
    if (typeof mockParsedRaw === 'string' && typeof reqParsedRaw === 'string') {
        const regex = wildcardToRegex(mockParsedRaw);
        return regex.test(reqParsedRaw);
    }

    return mockParsedRaw === reqParsedRaw;
}

function parseRawHeaders(rawHeaders) {
    if (!rawHeaders || typeof rawHeaders !== 'string') return {};
    const lines = rawHeaders.split('\n');
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

function matchReqHeader(mock, reqReceived) {
    const mockHeaders = parseRawHeaders(mock.req_header);
    const actualHeaders = parseRawHeaders(reqReceived.req_header);

    if (!mockHeaders && !actualHeaders) return true; 
    if (!mockHeaders || !actualHeaders) return false; 

    for (const [key, mockVal] of Object.entries(mockHeaders)) {
        const actualVal = actualHeaders[key];
        if (actualVal === undefined) return false;

        const regex = wildcardToRegex(mockVal);
        if (!regex.test(actualVal)) return false;
    }
    return true;
}
function filterAllMatching(savedMocks, reqReceived) {
    return savedMocks.filter((mock) => {
        return (
            matchPathParam(mock, reqReceived) &&
            matchQueryParam(mock, reqReceived) &&
            matchReqBody(mock, reqReceived) &&
            matchReqHeader(mock, reqReceived)
        );
    });
}

function sortMockByPriority(matchingMocks) {
    return matchingMocks.sort((a, b) => {
        const aPriority = a.priority ?? -Infinity;
        const bPriority = b.priority ?? -Infinity;

        if (aPriority !== bPriority) {
            return bPriority - aPriority;
        }

        return new Date(b.updated_at) - new Date(a.updated_at);
    });
}

module.exports = {
    filterAllMatching,
    sortMockByPriority,
};
