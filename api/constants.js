// Environment configuration for Vercel deployment
import { ENV_CONFIG } from './env-config.js';

const getBackendUrl = () => {
  // Use the build-time injected environment configuration
  if (ENV_CONFIG && ENV_CONFIG.BACKEND_URL) {
    return ENV_CONFIG.BACKEND_URL;
  }
  
  // Fallback for local development
  return 'http://localhost:3000/api';
};

const BASE_URL = getBackendUrl();

const API_ENDPOINTS = {
  LLM_LEARN_EMAIL: '/llm-learn/email-signup'
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8080',
};

export { BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS }; 