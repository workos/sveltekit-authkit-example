import { authKit } from '@workos/authkit-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ url }) => {
	const returnPathname = url.searchParams.get('returnPathname') || '/';
	
	// Generate WorkOS authorization URL with return path
	const signInUrl = await authKit.getSignInUrl({
		returnTo: returnPathname
	});

	throw redirect(302, signInUrl);
};
