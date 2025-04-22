// src/services/mockService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Creates a new mock configuration on the server.
 * @param {Object} mockData - The mock definition payload.
 * @returns {Promise<Object>} The created mock.
 */
export const createMock = async (mockData) => {
  const response = await fetch(`${API_BASE_URL}/api/mock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mockData),
  });

  if (!response.ok) {
    let errorMsg = 'Failed to create mock';
    try {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } catch {};
    throw new Error(errorMsg);
  }

  return response.json();
};

/**
 * Retrieves all mock configurations.
 * @returns {Promise<Array>} List of mocks.
 */
export const getMocks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/mock`);
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to fetch mocks');
  }
  return response.json();
};
