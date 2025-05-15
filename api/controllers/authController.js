const authService = require('../services/authService');


exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(result.status).json(result.payload);
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
