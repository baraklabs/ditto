const MockModel = require('../models/mockModel');
const { extractRequestDetails, cleanRequestData } = require('../utils/requestUtils');
const { filterAllMatching, sortMockByPriority } = require('../utils/matchUtils');
const { handleMockResponse } = require('../utils/responseUtils');

const ProcessMockService = {
    generateMock: async (req, res) => {
        try {
            const rawData = extractRequestDetails(req);
            const cleanedReq = cleanRequestData(rawData);

            const allSavedMocks = await MockModel.getMocks(cleanedReq.req_method);
            if (!allSavedMocks || allSavedMocks.length === 0) {
                return res.status(404).json({ message: "No matching mock found" });
            }

            const matchingMocks = filterAllMatching(allSavedMocks, cleanedReq);
            if (!matchingMocks || matchingMocks.length === 0) {
                return res.status(404).json({ message: "No matching mock found" });
            }

            const sorted = sortMockByPriority(matchingMocks);
            const selected = sorted[0];

            if (!selected) {
                return res.status(404).send('No matching mock found');
            }
            await handleMockResponse(selected, cleanedReq, res);

        } catch (error) {
            console.error("Error generating mock:", error);
            return res.status(500).json({ error: "Ditto: Internal Server Error" });
        }
    },
};

module.exports = ProcessMockService;
