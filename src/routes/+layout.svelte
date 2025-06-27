<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import SignInButton from '$lib/components/SignInButton.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		data: {
			user: any;
		};
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<div class="app-container">
	<div class="content-wrapper">
		<div class="main-content">
			<div class="card">
				<header>
					<nav>
						<a href="/" class="nav-button" class:active={$page.url.pathname === '/'}> Home </a>
						<a href="/account" class="nav-button" class:active={$page.url.pathname === '/account'}>
							Account
						</a>
					</nav>

					<SignInButton user={data.user} />
				</header>

				<main>
					{@render children()}
				</main>
			</div>
		</div>

		<Footer />
	</div>
</div>

<style>
	.app-container {
		min-height: 100vh;
		background-color: #f7f7f7;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 1.25rem;
		min-height: 100vh;
		max-width: 1200px;
		margin: 0 auto;
	}

	.main-content {
		flex: 1;
	}

	.card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	nav {
		display: flex;
		gap: 1rem;
	}

	.nav-button {
		padding: 0.5rem 1rem;
		background: rgba(99, 102, 241, 0.1);
		color: #6366f1;
		border: none;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.nav-button:hover {
		background: rgba(99, 102, 241, 0.2);
	}

	.nav-button.active {
		background: #6366f1;
		color: white;
	}

	main {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
