<script lang="ts">
	import type { User } from '@workos/authkit-sveltekit';

	interface Props {
		user: User | null;
		large?: boolean;
	}

	let { user = null, large = false }: Props = $props();
</script>

{#if user}
	<form method="POST" action="/logout">
		<button type="submit" class="button primary" class:large> Sign Out </button>
	</form>
{:else}
	<a href="/login" class="button primary" class:large>
		Sign In{#if large}
			with AuthKit{/if}
	</a>
{/if}

<style>
	.button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		display: inline-block;
	}

	.button.primary {
		background: #6366f1;
		color: white;
	}

	.button.primary:hover {
		background: #4f46e5;
	}

	.button.large {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
	}

	form {
		display: inline-block;
	}
</style>
