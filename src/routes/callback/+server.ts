import { authKit } from '@workos/authkit-sveltekit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = authKit.handleCallback();
