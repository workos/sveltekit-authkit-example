<script lang="ts">
  import SignInButton from '$lib/components/SignInButton.svelte';
  
  interface Props {
    data: {
      user: any;
    };
  }
  
  let { data }: Props = $props();
</script>

<div class="home-container">
  {#if data.user}
    <h1 class="title">
      Welcome back{data.user.firstName ? `, ${data.user.firstName}` : ''}
    </h1>
    <p class="subtitle">
      You are now authenticated into the application
    </p>
    <div class="actions">
      <a href="/account" class="button secondary">
        View account
      </a>
      <SignInButton user={data.user} large={true} />
    </div>
  {:else}
    <h1 class="title">AuthKit authentication example</h1>
    <p class="subtitle">
      Sign in to view your account details
    </p>
    <SignInButton user={null} large={true} />
  {/if}
</div>

<style>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }

  .title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #6b7280;
    margin: 0.5rem 0 2rem 0;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .button {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s;
    display: inline-block;
  }

  .button.secondary {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }

  .button.secondary:hover {
    background: rgba(99, 102, 241, 0.2);
  }
</style>
