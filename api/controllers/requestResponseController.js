const Service = require('../services/requestResponseService');

const listAll = async (req, res) => {
  try {
    const items = await Service.listAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error listing request-responses', error: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Service.getById(id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching request-response', error: err.message });
  }
};

const create = async (req, res) => {
  const { request, response } = req.body;
  try {
    const created = await Service.create({ request, response });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error creating request-response', error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { request, response } = req.body;
  try {
    const updated = await Service.update(id, { request, response });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating request-response', error: err.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Service.remove(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting request-response', error: err.message });
  }
};

module.exports = { listAll, getById, create, update, remove };