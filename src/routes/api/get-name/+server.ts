import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.auth?.user) {
		throw error(401, 'User not authenticated');
	}

	return json({ name: locals.auth.user.firstName || 'Unknown' });
};
