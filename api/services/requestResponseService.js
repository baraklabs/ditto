const RequestResponseModel = require('../models/requestResponseModel');

const RequestResponseService = {
  listAll: () => RequestResponseModel.getAll(),
  getById: (id) => RequestResponseModel.getById(id),
  create: (data) => RequestResponseModel.create(data),
  update: (id, data) => RequestResponseModel.update(id, data),
  remove: (id) => RequestResponseModel.remove(id)
};

module.exports = RequestResponseService;
