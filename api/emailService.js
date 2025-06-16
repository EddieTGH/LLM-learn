import { BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from './constants.js';
import { handleApiError, handleApiSuccess, isValidEmail } from './utils.js';

/**
 * Submit email address to the LLM Learn email endpoint
 * @param {string} email - The email address to submit
 * @returns {Promise<Object>} API response object
 */
export const submitEmail = async (email) => {
  // Validate email format
  if (!email || !email.trim()) {
    return {
      success: false,
      message: 'Email address is required',
      status: 400,
      data: null
    };
  }

  const trimmedEmail = email.trim();
  
  if (!isValidEmail(trimmedEmail)) {
    return {
      success: false,
      message: 'Please enter a valid email address',
      status: 400,
      data: null
    };
  }

  try {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.LLM_LEARN_EMAIL}`, {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS
      },
      body: JSON.stringify({ email: trimmedEmail })
    });

    // Convert fetch response to axios-like format for compatibility
    const responseData = {
      data: await response.json().catch(() => ({})),
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    };

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return handleApiSuccess(responseData);
  } catch (error) {
    return handleApiError(error);
  }
}; 