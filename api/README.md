# LLM Learn Email API

This folder contains the API integration for handling email submissions on the LLM Learn landing page.

## Structure

- `constants.js` - API configuration constants including base URL and endpoints
- `utils.js` - Utility functions for error handling and email validation
- `emailService.js` - Main service for handling email submissions
- `index.js` - Main export file for easy importing

## Configuration

The API base URL is configured via environment variable:

```javascript
const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";
```

## Endpoint

**POST** `/llm-learn-email`

### Request Headers

```javascript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

### Request Body

```javascript
{
  "email": "user@example.com"
}
```

### Response Format

```javascript
{
  "success": boolean,
  "message": string,
  "status": number,
  "data": object | null
}
```

## Usage

```javascript
import { submitEmail } from "./api/index.js";

const result = await submitEmail("user@example.com");
if (result.success) {
  console.log("Email submitted successfully");
} else {
  console.error("Error:", result.message);
}
```

## Features

- Email validation
- Error handling with user-friendly messages
- Loading states for buttons
- Success/error notifications
- Keyboard support (Enter key to submit)

## Integration Points

The API is integrated with:

- Hero section email form
- Footer email form
- "Book a demo" button (prompts for email)
