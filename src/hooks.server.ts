import { authKit } from '$lib/authkit/index.js';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Skip auth check for auth-related routes to prevent redirect loops
	const isAuthRoute =
		event.url.pathname.startsWith('/login') ||
		event.url.pathname.startsWith('/callback') ||
		event.url.pathname.startsWith('/logout');

	if (isAuthRoute) {
		return resolve(event);
	}

	try {
		// Check authentication for all non-auth routes
		const authResult = await authKit.withAuth(event.request);

		// Populate locals with auth data for use in routes and components
		// Type assertion needed due to version differences between authkit-ssr and @workos-inc/node
		event.locals.user = (authResult.user as any) || null;
		event.locals.sessionId = authResult.sessionId;
		event.locals.organizationId = authResult.claims?.org_id;
		event.locals.role = authResult.claims?.role;
		event.locals.permissions = authResult.claims?.permissions as string[];
		event.locals.impersonator = authResult.impersonator;
		event.locals.accessToken = authResult.accessToken;

		// Define which routes require authentication
		const protectedPaths = ['/account'];
		const isProtectedRoute = protectedPaths.some((path) => event.url.pathname.startsWith(path));

		// Redirect to login if accessing protected route without authentication
		if (isProtectedRoute && !authResult.user) {
			const returnPath = event.url.pathname + event.url.search;
			throw redirect(302, `/login?returnPathname=${encodeURIComponent(returnPath)}`);
		}

		return resolve(event);
	} catch (error) {
		// If it's already a redirect, re-throw it
		if (error instanceof Response && error.status >= 300 && error.status < 400) {
			throw error;
		}

		// For other auth errors, clear locals and continue
		// This allows the app to function with unauthenticated state
		event.locals.user = null;
		event.locals.sessionId = undefined;
		event.locals.organizationId = undefined;
		event.locals.role = undefined;
		event.locals.permissions = undefined;
		event.locals.impersonator = undefined;
		event.locals.accessToken = undefined;

		return resolve(event);
	}
};
