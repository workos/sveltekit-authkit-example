import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.auth?.user) {
		throw redirect(302, '/login');
	}

	return {
		user: locals.auth.user,
		role: locals.auth.role,
		permissions: locals.auth.permissions
	};
};
