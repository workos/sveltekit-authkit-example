import type { AuthKitAuth } from '@workos/authkit-sveltekit';
import type { User } from '@workos-inc/node';

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
		interface Locals {
			auth: AuthKitAuth;
		}
		interface PageData {
			user: User | null;
		}
	}
}

export {};