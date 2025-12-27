import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6922e5b0ed36c6ebd97761f8", 
  requiresAuth: false // Ensure authentication is required for all operations
});
