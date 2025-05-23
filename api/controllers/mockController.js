const MockService = require('../services/mockService');

const getAllMocks = async (req, res) => {
  try {
    let userId= req.user.userId

    const mocks = await MockService.listMocks(userId);
    res.json(mocks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching mocks', error: err.message });
  }
};

const getMockById = async (req, res) => {
  const { id } = req.params;
  try {
    const mock = await MockService.getMockById(id);
    if (!mock) return res.status(404).json({ message: 'Mock not found' });
    res.json(mock);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching mock', error: err.message });
  }
};

const createMock = async (req, res) => {
  const mockData = req.body;
  let userId= req.user.userId
  try {
    const created = await MockService.createMock(mockData, userId);
    res.status(201).json(created);
  } catch (err) {
    console.log("Error creating mock",err);
    res.status(500).json({ message: 'Error creating mock' });
  }
};

const updateMock = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const userId = req.user?.userId; // ensure this is populated by auth middleware

  if (!id || !userId) {
    return res.status(400).json({ message: 'Missing mock ID or user ID' });
  }

  try {
    const updated = await MockService.updateMock(id, updatedData, userId);
    if (!updated) {
      return res.status(404).json({ message: 'Mock not found or access denied' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating mock', error: err.message });
  }
};

const deleteMock = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await MockService.deleteMock(id);
    if (!deleted) return res.status(404).json({ message: 'Mock not found' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting mock', error: err.message });
  }
};

module.exports = {
  getAllMocks,
  getMockById,
  createMock,
  updateMock,
  deleteMock
};
