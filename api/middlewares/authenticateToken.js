const jwtUtils = require('../utils/jwt');

module.exports = (req, res, next) => {
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
