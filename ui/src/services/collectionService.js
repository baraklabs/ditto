// src/services/collectionService.js
import { getApiBaseUrl } from '../utils/getApiBaseUrl';

const API_BASE_URL = getApiBaseUrl();
const getToken = () => localStorage.getItem('authToken');

export const createCollection = async (name) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/ditto/collection`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    let error = 'Failed to create collection';
    try {
      const errData = await response.json();
      error = errData.message || error;
    } catch (e) { }
    throw new Error(error);
  }

  return await response.json();
};

export const getCollections = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/ditto/collection`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch collections');
  }
  return response.json();
};

export const getCollectionsMocks = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/ditto/collection/mock`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch collections');
  }
  return response.json();
};
export const renameCollection = async (id, newName) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/ditto/collection/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to rename collection');
  }

  return response.json();
};

export const deleteCollection = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/ditto/collection/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete collection');
  }

  return response.json();
};
