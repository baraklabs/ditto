const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { findUserByEmail } = require('../models/userModel');

exports.login = async ({ email_id, password }) => {
  if (!email_id || !password) {
    return { status: 400, payload: 'Email and password are required' };
  }

  const user = await findUserByEmail(email_id);
  if (!user) {
    return { status: 401, payload: 'Invalid email id' };
  }
  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    return { status: 401, payload: 'Invalid credentials' };
  }

  if (!user.active) {
    return { status: 403, payload: 'Account not active.' };
  }
 // Check if the user is an admin 
 const isAdmin = email_id === process.env.ADMIN_USER_EMAIL_ID;
 if (isAdmin) {
   const token = jwt.generateToken({ userId: user.id, email: user.email_id, role: 'admin' });
   return {
     status: 200,
     payload: {
       message: 'Login successful - Admin',
       token,
       user: {
         id: user.id,
         first_name: user.first_name,
         last_name: user.last_name,
         email_id: user.email_id,
         role: 'admin'
       }
     }
   };
 }
  const token = jwt.generateToken({ userId: user.id, email: user.email_id });

  return {
    status: 200,
    payload: {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email_id: user.email_id,
      }
    }
  };
};
