const jwt = require('jsonwebtoken');


exports.generateToken = (payload) => {
  const options = process.env.JWT_EXPIRY ? { expiresIn: process.env.JWT_EXPIRY } : {};
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

exports.verify = (token) => {
  return jwt.verify(token,  process.env.JWT_SECRET);
};
