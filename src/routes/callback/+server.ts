import { authKit } from '@workos/authkit-sveltekit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = (event) => {
  // Defer calling handleCallback until runtime when config is available
  const handler = authKit.handleCallback();
  return handler(event);
};
