import { redirect, error } from '@sveltejs/kit';
import { authKit } from '$lib/authkit/index.js';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Get current authentication state
		const authResult = await authKit.withAuth(request);

		if (!authResult.user || !authResult.accessToken || !authResult.refreshToken) {
			// No active session to logout, redirect to home
			throw redirect(302, '/');
		}

		const session = {
			user: authResult.user,
			accessToken: authResult.accessToken,
			refreshToken: authResult.refreshToken,
			impersonator: authResult.impersonator
		};

		// Create empty response for session termination
		let response = new Response(null, { status: 302 });

		// Get logout URL and clear session
		const logoutResult = await authKit.getLogoutUrl(session, response, { returnTo: '/' });

		// Extract URL and response
		const logoutUrl = typeof logoutResult === 'string' ? logoutResult : logoutResult.logoutUrl;
		const clearedResponse =
			typeof logoutResult === 'string'
				? await authKit.saveSession(response, '')
				: logoutResult.response;

		// Set the redirect location to WorkOS logout URL
		clearedResponse.headers.set('Location', logoutUrl);

		return clearedResponse;
	} catch (err) {
		// If it's already a redirect, return it
		if (err instanceof Response) {
			return err;
		}
		console.error('Logout error:', err);
		throw error(500, 'Logout failed');
	}
};
