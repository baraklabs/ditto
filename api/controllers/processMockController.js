const processMockService = require('../services/processMockService');
exports.generate = (req, res) => {
    processMockService.generateMock(req, res);
};
