const MockModel = require('../models/mockModel');

const extractRequestDetails = (req) => {
    return {
        req_method: req.method,
        req_path_param: req.originalUrl.split('?')[0],
        req_header: req.headers,
        req_body: req.body,
        req_query_params: req.query,
        cookies: req.cookies,
    };
};

function normalizeValue(value) {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string' && value.trim() === '') return null;
    if (typeof value === 'object' && Object.keys(value).length === 0) return null;
    return value;
}


const normalizeRequestData = (data) => {
    return {
        req_method: normalizeValue(data.req_method),
        req_path_param: normalizeValue(data.req_path_param),
        req_header: normalizeValue(data.req_header),
        req_body: normalizeValue(data.req_body),
        req_query_params: normalizeValue(data.req_query_params),
        cookies: normalizeValue(data.cookies),
    };
};
function filterAllMatching(savedMocks, reqReceived) {
    const parseSafely = (input) => {
      if (input === null || input === undefined || input === "") return null;
      try {
        return JSON.parse(input);
      } catch {
        return input; // return original string if not valid JSON
      }
    };
  
    const reqBodyParsed = parseSafely(reqReceived.req_body);
    const reqQueryParsed = parseSafely(reqReceived.req_query_params);
  
    return savedMocks.filter((mock) => {
      const mockBodyParsed = parseSafely(mock.req_body);
      const mockQueryParsed = parseSafely(mock.req_query_params);
      return (
        mock.req_method === reqReceived.req_method &&
        mock.req_path_param === reqReceived.req_path_param &&
        JSON.stringify(mockBodyParsed) === JSON.stringify(reqBodyParsed) &&
        JSON.stringify(mockQueryParsed) === JSON.stringify(reqQueryParsed)
      );
    });
  }
  
function getHighestPriorityMock(matchingMocks) {
    const sorted = matchingMocks
        .sort((a, b) => {
            const aPriority = a.priority ?? -Infinity; 
            const bPriority = b.priority ?? -Infinity; 

            // Compare priorities first (higher priority number wins)
            if (aPriority !== bPriority) {
                return bPriority - aPriority; // reverse comparison to prioritize higher numbers
            }

            // If priorities are the same, use the latest updated time
            return new Date(b.updated_at) - new Date(a.updated_at); 
        });
    return sorted;
}
const ProcessMockService = {
    generateMock: async (req, res) => {
        try {
            const rawData = extractRequestDetails(req);
            const filters = normalizeRequestData(rawData);
            const allSavedMocks = await MockModel.getMocks(filters.req_method);
            if (!allSavedMocks || allSavedMocks.length === 0) {
                return res.status(404).json({ message: "No matching mock found" });
            }

            let matchingMocks = filterAllMatching(allSavedMocks, filters);
            console.log("matchingMocks " + JSON.stringify(matchingMocks))

            if (!matchingMocks || matchingMocks.length === 0) {
                return res.status(404).json({ message: "No matching mock found" });
            }
            const sorted = getHighestPriorityMock(matchingMocks);

            const selected = sorted[0];
            const delay = selected.res_delay_ms || 0;
            const status = selected.res_status || 200;
            const headers = selected.res_header ? JSON.parse(selected.res_header) : {};
            const body = selected.res_body || null;

            // Set headers first
            if (headers && typeof headers === 'object') {
                Object.entries(headers).forEach(([key, value]) => {
                    res.setHeader(key, value);
                    console.log(`Set header: ${key} = ${value}`);
                });
            }

            // Delay the response if needed
            setTimeout(() => {
                res.status(status).send(body);
            }, delay);
        } catch (error) {
            console.error("Error generating mock:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
};


module.exports = ProcessMockService;









