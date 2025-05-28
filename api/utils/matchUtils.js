const { normalizeObject, parseSafely, normalizeHeaders, normalizeQuery } = require("./normalize");


function matchPathParam(mock, req) {
    return mock.req_method === req.req_method &&
           mock.req_path_param === req.req_path_param;
}

function matchQueryParam(mock, req) {
    return normalizeQuery(mock.req_query_param) === normalizeQuery(req.req_query_param);
}

function matchReqBody(mock, req) {
    const mockBodyParsed = normalizeObject(parseSafely(mock.req_body));
    const reqBodyParsed = normalizeObject(parseSafely(req.req_body));
    return JSON.stringify(mockBodyParsed) === JSON.stringify(reqBodyParsed);
}

function matchReqHeader(mock, req) {
    return normalizeHeaders(mock.req_header) === normalizeHeaders(req.req_header);
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

function getHighestPriorityMock(matchingMocks) {
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
    getHighestPriorityMock,
};
