<script lang="ts">
  interface Props {
    data: {
      user: any;
      role?: string;
      permissions?: string[];
    };
  }
  
  let { data }: Props = $props();
  
  let userFields = $derived(data.user ? [
    ['First name', data.user.firstName],
    ['Last name', data.user.lastName],
    ['Email', data.user.email],
    ...(data.role ? [['Role', data.role]] : []),
    ...(data.permissions?.length ? [['Permissions', data.permissions.join(', ')]] : []),
    ['Id', data.user.id]
  ].filter(([_, value]) => value) : []);
</script>

<div class="account-container">
  <div class="account-header">
    <h1>Account details</h1>
    <p>Below are your account details</p>
  </div>
  
  {#if userFields.length > 0}
    <div class="fields">
      {#each userFields as [label, value]}
        <label class="field">
          <span class="label">{label}</span>
          <div class="input-wrapper">
            <input type="text" value={String(value)} readonly />
          </div>
        </label>
      {/each}
    </div>
  {/if}
</div>

<style>
  .account-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 400px;
    width: 100%;
  }

  .account-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .account-header h1 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
  }

  .account-header p {
    font-size: 1.25rem;
    color: #6b7280;
    margin: 0;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .label {
    font-weight: 700;
    font-size: 0.875rem;
    min-width: 100px;
    text-align: right;
  }

  .input-wrapper {
    flex: 1;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
    background: #f9fafb;
    cursor: default;
  }

  input:focus {
    outline: 2px solid #6366f1;
    outline-offset: -1px;
  }
</style>