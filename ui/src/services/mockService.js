// src/services/mockService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem('authToken');

/**
 * Creates a new mock configuration on the server.
 * @param {Object} mockData - The mock definition payload.
 * @returns {Promise<Object>} The created mock.
 */
export const createMock = async (mockData) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/ditto/mock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mockData),
  });

  if (!response.ok) {
    let errorMsg = 'Failed to create mock';
    try {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
};

/**
 * Retrieves all mock configurations.
 * @returns {Promise<Array>} List of mocks.
 */
export const getMocks = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/ditto/mock`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to fetch mocks');
  }
  return response.json();
};
