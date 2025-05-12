const jwtUtils = require('../utils/jwt');
const { findUserByEmail } = require('../models/userModel');

module.exports = (req, res, next) => {
  if(!process.env.VITE_ENABLE_LOGIN){
    const user = findUserByEmail(process.env.VITE_GUEST_USER_EMAIL_ID);
    req.user = { userId: user.id, email: user.email_id };
    next();
  }
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Missing token' });


  try {
    const user = jwtUtils.verify(token); 
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};
