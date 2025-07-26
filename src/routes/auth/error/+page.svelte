<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error-page">
	<h1>Authentication Error</h1>
	<p>
		{$page.url.searchParams.get('message') || 'An error occurred during authentication.'}
	</p>
	<a href="/login" class="btn">Try Again</a>
</div>

<style>
	.error-page {
		max-width: 400px;
		margin: 2rem auto;
		padding: 2rem;
		text-align: center;
	}

	h1 {
		color: #dc3545;
		margin-bottom: 1rem;
	}

	p {
		margin-bottom: 2rem;
		color: #666;
	}

	.btn {
		display: inline-block;
		padding: 0.5rem 1rem;
		background-color: #0866ff;
		color: white;
		text-decoration: none;
		border-radius: 4px;
	}

	.btn:hover {
		background-color: #0653d3;
	}
</style>