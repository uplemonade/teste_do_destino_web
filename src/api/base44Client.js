import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "691bd2151db1404d94a817d3",
  requiresAuth: !import.meta.env.DEV // Ensure authentication is required for all operations, except in dev
});
