const userService = require('../services/userService');

// Controller for getting user profile
exports.getUserProfile = async (req, res) => {
  const admin = req.user;

  if (!admin || admin.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller for updating user profile
exports.updateUserProfile = async (req, res) => {
 
};
exports.createUserProfile = async (req, res) => {
  const admin = req.user;

  if (!admin || admin.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { email_id, password, first_name = '', last_name = '' } = req.body;

  if (!email_id || !password) {
    return res.status(400).json({ message: 'email_id and password are required' });
  }

  try {
    const newUser = await userService.createUser({ email_id, password, first_name, last_name });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};