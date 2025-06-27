import { parse, serialize } from 'cookie';
import type { SessionStorage, AuthKitConfig } from '@workos-inc/authkit-ssr';

/**
 * SvelteKit-specific session storage adapter for AuthKit SSR
 * Implements SessionStorage interface for Web API Request/Response objects
 */
export class SvelteKitStorage implements SessionStorage<Request, Response> {
	cookieName = 'wos-session';

	/**
	 * Extract session data from request cookies
	 */
	async getSession(request: Request): Promise<string | null> {
		const cookieHeader = request.headers.get('cookie');
		if (!cookieHeader) return null;

		const cookies = parse(cookieHeader);
		return cookies[this.cookieName] || null;
	}

	/**
	 * Save session data to response cookies
	 * Creates a new Response with session cookie set
	 */
	async saveSession(response: Response, sessionData: string): Promise<Response> {
		const newResponse = new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: new Headers(response.headers)
		});

		const cookie = serialize(this.cookieName, sessionData, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 400
		});
		newResponse.headers.append('Set-Cookie', cookie);
		return newResponse;
	}

	/**
	 * Clear session cookie from response
	 * Creates a new Response with expired session cookie
	 */
	async clearSession(response: Response): Promise<Response> {
		const newResponse = new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: new Headers(response.headers)
		});

		const cookie = serialize(this.cookieName, '', {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 0,
			expires: new Date(0)
		});

		newResponse.headers.append('Set-Cookie', cookie);
		return newResponse;
	}
}
