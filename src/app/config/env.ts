// src/app/config/env.ts
export const OPENAI_API_KEY = 'testtest';

// Check if API key is available when this file is imported
if (typeof window !== 'undefined' && !OPENAI_API_KEY) {
  console.warn('Warning: NEXT_PUBLIC_OPENAI_API_KEY is not set. Speech-to-text functionality will not work.');
}