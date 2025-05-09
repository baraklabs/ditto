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
    const response = await fetch(`${API_BASE_URL}/api/ditto/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_id, password }),
    });

    const data = await response.json();

    if (response.ok && data?.token) {
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