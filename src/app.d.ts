import type { User, Impersonator } from '@workos-inc/node';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			sessionId?: string;
			organizationId?: string;
			role?: string;
			permissions?: string[];
			impersonator?: Impersonator;
			accessToken?: string;
		}
		interface PageData {
			user: User | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
