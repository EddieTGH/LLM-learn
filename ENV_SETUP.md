# Environment Variables Setup for Vercel

This project uses a build-time environment variable injection approach for native HTML/CSS/JS deployment on Vercel.

## How It Works

1. **Build-time Injection**: Environment variables are injected during the build process
2. **Generated Config**: A `api/env-config.js` file is automatically generated with your environment variables
3. **ES Module Import**: The config is imported as a standard ES module in your application

## Setup Instructions

### 1. Set Environment Variables in Vercel

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables:
   - `BACKEND_URL` - Your backend API URL (e.g., `https://api.yourapp.com/api`)
   - Add any other environment variables you need

### 2. Local Development

For local development, you can set environment variables in several ways:

#### Option A: Command Line

```bash
BACKEND_URL=http://localhost:3000/api npm run build
```

#### Option B: Create a `.env.local` file (not tracked in git)

```bash
# .env.local
BACKEND_URL=http://localhost:3000/api
```

Then modify `scripts/inject-env.js` to load from `.env.local`:

```javascript
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
```

### 3. Build Process

The build process automatically:

1. Runs `npm run inject-env` to generate `api/env-config.js`
2. Builds your Tailwind CSS
3. Deploys to Vercel

## Usage in Code

```javascript
// Import the environment configuration
import { ENV_CONFIG } from "./api/env-config.js";

// Use environment variables
const apiUrl = ENV_CONFIG.BACKEND_URL;
console.log("API URL:", apiUrl);
```

## Available Environment Variables

- `BACKEND_URL` - Backend API base URL
- Add more variables in `scripts/inject-env.js` as needed

## Alternative Approaches

### Option 1: Runtime Environment Variables (Advanced)

If you need runtime environment variables, you can create an API endpoint:

```javascript
// api/config.js (Vercel serverless function)
export default function handler(req, res) {
  res.json({
    BACKEND_URL: process.env.BACKEND_URL,
  });
}
```

Then fetch it in your frontend:

```javascript
const config = await fetch("/api/config").then((r) => r.json());
```

### Option 2: Direct Replacement with Build Tools

You could also use tools like `envify` or custom webpack configurations, but the current approach is simpler for native HTML/CSS/JS projects.

## Security Notes

- Never expose sensitive keys (API secrets, private keys) to the frontend
- Only include environment variables that are safe to be public
- The generated `api/env-config.js` file is included in your bundle and visible to users

## Troubleshooting

### Build Fails

- Ensure `scripts/inject-env.js` has proper permissions
- Check that all required environment variables are set in Vercel

### Environment Variables Not Loading

- Verify the `api/env-config.js` file is generated during build
- Check that the import path is correct in your code
- Ensure the build process runs `npm run inject-env` before other build steps

### Local Development Issues

- Make sure you're setting environment variables before running build commands
- Check that the generated config file exists and has the correct values
