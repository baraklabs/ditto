// src/services/collectionService.js
import { getApiBaseUrl } from '../utils/getApiBaseUrl';

const API_BASE_URL = getApiBaseUrl();
export const createCollection = async (name) => {
  const response = await fetch(`${API_BASE_URL}/api/collection`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    let error = 'Failed to create collection';
    try {
      const errData = await response.json();
      error = errData.message || error;
    } catch (e) {}
    throw new Error(error);
  }

  return await response.json();
};

export const getCollections = async () => {
  const response = await fetch(`${API_BASE_URL}/api/collection`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch collections');
  }
  return response.json();
};
export const getCollectionsMocks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/collection/mock`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch collections');
  }
  return response.json();
};
