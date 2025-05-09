import { getApiBaseUrl } from '../utils/getApiBaseUrl';

const API_BASE_URL = getApiBaseUrl();

const getToken = () => localStorage.getItem('authToken');

export const createUser = async (form) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/api/ditto/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    return res.ok
      ? { success: true, data }
      : { success: false, message: data.message || 'Failed to create user' };
  } catch (err) {
    return { success: false, message: err.message || 'Network error' };
  }
};

export const getUsers = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/api/ditto/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return res.ok
      ? { success: true, data:data.data }
      : { success: false, message: data.message || 'Failed to fetch users' };
  } catch (err) {
    return { success: false, message: err.message || 'Network error' };
  }
};
