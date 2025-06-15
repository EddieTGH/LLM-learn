/**
 * Handle API errors consistently
 * @param {Error} error - The error object from axios
 * @returns {Object} Formatted error response
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      success: false,
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      success: false,
      message: 'Network error - please check your connection',
      status: null,
      data: null
    };
  } else {
    // Something else happened
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
      status: null,
      data: null
    };
  }
};

/**
 * Format successful API response
 * @param {Object} response - The response object from axios
 * @returns {Object} Formatted success response
 */
export const handleApiSuccess = (response) => {
  return {
    success: true,
    message: response.data?.message || 'Request successful',
    status: response.status,
    data: response.data
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}; 