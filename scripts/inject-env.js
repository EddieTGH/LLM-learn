import fs from 'fs';
import path from 'path';

// Environment variables to inject
const envConfig = {
  BACKEND_URL: process.env.BACKEND_URL || 'https://localhost:3000/api',
  // Add more environment variables as needed
  // API_KEY: process.env.API_KEY || '',
  // ENVIRONMENT: process.env.NODE_ENV || 'development'
};

// Create the config content
const configContent = `// Auto-generated environment configuration
// This file is generated during build time - do not edit manually

export const ENV_CONFIG = ${JSON.stringify(envConfig, null, 2)};
`;

// Write the config file
const configPath = path.join(process.cwd(), 'api', 'env-config.js');

try {
  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log('✅ Environment configuration injected successfully');
  console.log('📁 Config written to:', configPath);
  console.log('🔧 Environment variables:', Object.keys(envConfig));
} catch (error) {
  console.error('❌ Failed to inject environment configuration:', error);
  process.exit(1);
} 