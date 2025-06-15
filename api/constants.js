const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';

const API_ENDPOINTS = {
  LLM_LEARN_EMAIL: '/llm-learn/email-signup'
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export { BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS }; 