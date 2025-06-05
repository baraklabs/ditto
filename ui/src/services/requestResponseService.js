import { getApiBaseUrl } from '../utils/getApiBaseUrl';

const API_BASE_URL = getApiBaseUrl();

const getToken = () => localStorage.getItem('authToken');

/**
 * Fetch request-response logs for a specific day and page.
 * @param {number} dayOffset - 0 = Today, 1 = Yesterday, etc.
 * @param {number} page - Pagination page number.
 * @returns {Promise<{ data: Array, hasMore: boolean }>}
 */
export const getRequestResponses = async (dayOffset, page = 1) => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/api/ditto/request-response?day=${dayOffset}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let errorMsg = 'Failed to fetch request-response logs';
    try {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
};
