const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { findUserByEmail } = require('../models/userModel');

exports.login = async ({ email_id, password }) => {
  const isGuest = email_id === process.env.VITE_GUEST_USER_EMAIL_ID;
  const isAdmin = email_id === process.env.ADMIN_USER_EMAIL_ID;

  if (!email_id || (!isGuest && !password)) {
    return { status: 400, payload: 'Email and password are required' };
  }

  const user = await findUserByEmail(email_id);
  if (!user) {
    return { status: 401, payload: 'Invalid email id' };
  }

  if (!user.active) {
    return { status: 403, payload: 'Account not active.' };
  }

  if (!isGuest) {
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return { status: 401, payload: 'Invalid credentials' };
    }
  }

  const role = isAdmin ? 'admin' : isGuest ? 'guest' : 'user';
  const token = jwt.generateToken({ userId: user.id, email: user.email_id, role });

  return {
    status: 200,
    payload: {
      message: `Login successful${isAdmin ? ' - Admin' : isGuest ? ' - Guest' : ''}`,
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email_id: user.email_id,
        role
      }
    }
  };
};
