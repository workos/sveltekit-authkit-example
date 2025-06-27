import { redirect } from '@sveltejs/kit';
import { authKit } from '$lib/authkit/index.js';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ url }) => {
  const returnPathname = url.searchParams.get('returnPathname') || '/';
  
  // Generate WorkOS authorization URL with return path
  const signInUrl = await authKit.getAuthorizationUrl({
    returnPathname,
    screenHint: 'sign-in'
  });
  
  throw redirect(302, signInUrl);
};