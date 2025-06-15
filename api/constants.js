// Browser-compatible environment variable handling
const getEnvVar = (name, defaultValue) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // In browser, you could use window.ENV if you set it, or just return default
    return window.ENV?.[name] || defaultValue;
  }
  // In Node.js environment (if ever used)
  return process?.env?.[name] || defaultValue;
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// Change to this for local development
// const BASE_URL = getEnvVar('NEXT_PUBLIC_BACKEND_URL', 'http://localhost:3000/api');

const API_ENDPOINTS = {
  LLM_LEARN_EMAIL: '/llm-learn/email-signup'
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export { BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS }; 