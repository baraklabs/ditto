import { getApiBaseUrl } from '../utils/getApiBaseUrl';

const API_BASE_URL = getApiBaseUrl();

export const isUserLoggedIn = () => {
  return !!localStorage.getItem('authToken');
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const loginUser = async (email_id, password) => {
  try {
    const ENABLE_LOGIN = import.meta.env.VITE_ENABLE_LOGIN === 'true';
    const GUEST_USER_EMAIL = import.meta.env.VITE_GUEST_USER_EMAIL_ID;

    // If login is disabled, automatically log in with the guest user
    const payload = ENABLE_LOGIN
      ? { email_id, password }
      : { email_id: GUEST_USER_EMAIL };

    const response = await fetch(`${API_BASE_URL}/api/ditto/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data?.token) {
      // Set user and token in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'Network error' };
  }
};

// Call the login automatically if VITE_ENABLE_LOGIN is false
const ENABLE_LOGIN = import.meta.env.VITE_ENABLE_LOGIN === 'false';
if (ENABLE_LOGIN) {
  const GUEST_USER_EMAIL = import.meta.env.VITE_GUEST_USER_EMAIL_ID;
  loginUser(GUEST_USER_EMAIL).then((response) => {
    if (response.success) {
      console.log('Auto login successful with guest user.');
    } else {
      console.error('Auto login failed with guest user.');
    }
  });
}


export const getUsersProfile = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/api/ditto/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data.user));

  } catch (err) {
    return { success: false, message: err.message || 'Network error' };
  }
};
