import { json, error } from '@sveltejs/kit';
import { authKit } from '$lib/authkit/index.js';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ request }) => {
  const { user } = await authKit.withAuth(request);
  
  if (!user) {
    throw error(401, 'User not authenticated');
  }

  return json({ name: user.firstName || 'Unknown' });
};