const Service = require('../services/requestResponseService');


const listAll = async (req, res) => {
  try {
    const userId = req.user.userId;
    const day = parseInt(req.query.day || 0); // day offset: 0 = today
    const page = parseInt(req.query.page || 1);
    const limit = 10;
    const offset = (page - 1) * limit;

    const result = await Service.listAllByUserId(userId, day, offset, limit);

    res.json({
      data: result.items,
      hasMore: result.hasMore,
    });
  } catch (err) {
    console.error('Error in listAll:', err);
    res.status(500).json({ message: 'Error listing request-responses', error: err.message });
  }
};
module.exports = { listAll };