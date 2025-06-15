// Environment configuration for Vercel deployment
// For Vercel, environment variables need to be injected at build time
// or accessed through window object if set up properly

const getBackendUrl = () => {
  // Check if environment variable is available on window (injected at build time)
  if (typeof window !== 'undefined' && window.BACKEND_URL) {
    return window.BACKEND_URL;
  }
  
  // Check for Vercel environment variable pattern
  if (typeof window !== 'undefined' && window.ENV?.BACKEND_URL) {
    return window.ENV.BACKEND_URL;
  }
  
  // For local development, you can uncomment and modify this line:
  // return 'http://localhost:3000/api';
  
  // SIMPLE OPTION: Just replace this with your actual backend URL
  // return 'https://your-actual-backend-url.com/api';
  
  // Default production URL - replace with your actual backend URL
  return 'https://localhost:3000/api';
};

const BASE_URL = getBackendUrl();

const API_ENDPOINTS = {
  LLM_LEARN_EMAIL: '/llm-learn/email-signup'
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export { BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS }; 