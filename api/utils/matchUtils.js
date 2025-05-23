// utils/matchUtils.js

function parseSafely(input) {
    if (input === null || input === undefined || input === "") return null;
    try {
        return JSON.parse(input);
    } catch {
        return input;
    }
}

function parseSafely(input) {
    if (input === null || input === undefined || input === "") return null;
    try {
        return JSON.parse(input);
    } catch {
        return input;
    }
}

function matchPathParam(mock, req) {
    return mock.req_method === req.req_method &&
           mock.req_path_param === req.req_path_param;
}

function matchQueryParam(mock, req) {
    const mockQueryParsed = parseSafely(mock.req_query_param);
    const reqQueryParsed = parseSafely(req.req_query_param);
    return JSON.stringify(mockQueryParsed) === JSON.stringify(reqQueryParsed);
}

function matchReqBody(mock, req) {
    const mockBodyParsed = parseSafely(mock.req_body);
    const reqBodyParsed = parseSafely(req.req_body);
    return JSON.stringify(mockBodyParsed) === JSON.stringify(reqBodyParsed);
}

function matchReqHeader(mock, req) {
    // Optional: implement if you want to match headers too
    // Example:
    // return JSON.stringify(mock.req_header) === JSON.stringify(req.req_header);
    return true; // skip for now
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
