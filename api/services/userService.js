const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.createUser = async ({ email_id, password, first_name, last_name }) => {
  const password_hash = await bcrypt.hash(password, 10);
  return await userModel.create({ email_id, password_hash, first_name, last_name });
};

exports.getAllUsers = async () => {
  return await userModel.getAllUsers();
};
exports.getUser = async (userId) => {
  return await userModel.getUserProfile(userId);
};