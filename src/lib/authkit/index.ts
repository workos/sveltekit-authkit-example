import { configure, createAuthKitFactory } from '@workos/authkit-session';
import { SvelteKitStorage } from './storage.js';
import { SvelteKitSessionEncryption } from './encryption.js';
import { env } from '$env/dynamic/private';

// Configure AuthKit with environment variables
configure({
	clientId: env.WORKOS_CLIENT_ID!,
	apiKey: env.WORKOS_API_KEY!,
	redirectUri: env.WORKOS_REDIRECT_URI!,
	cookiePassword: env.WORKOS_COOKIE_PASSWORD!
});

// Create AuthKit factory instance for SvelteKit
export const authKit = createAuthKitFactory<Request, Response>({
	sessionStorageFactory: () => new SvelteKitStorage(),
	sessionEncryptionFactory: () => new SvelteKitSessionEncryption()
});

// Re-export types for convenience
export type { User, Impersonator } from '@workos-inc/node';
