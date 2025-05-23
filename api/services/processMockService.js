const MockModel = require('../models/mockModel');
const { extractRequestDetails, normalizeRequestData } = require('../utils/requestUtils');
const { filterAllMatching } = require('../utils/matchUtils');
const { handleMockResponse } = require('../utils/responseUtils');

const ProcessMockService = {
    generateMock: async (req, res) => {
        try {
            const rawData = extractRequestDetails(req);
            const filters = normalizeRequestData(rawData);

            const allSavedMocks = await MockModel.getMocks(filters.req_method);
            if (!allSavedMocks || allSavedMocks.length === 0) {
                return res.status(404).json({ message: "No matching mock found" });
            }

            const matchingMocks = filterAllMatching(allSavedMocks, filters);
            if (!matchingMocks || matchingMocks.length === 0) {
                return res.status(404).json({ message: "No matching mock found" });
            }

            await handleMockResponse(matchingMocks, res);

        } catch (error) {
            console.error("Error generating mock:", error);
            return res.status(500).json({ error: "Ditto: Internal Server Error" });
        }
    },
};

module.exports = ProcessMockService;
