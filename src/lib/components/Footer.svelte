<div class="footer-grid">
  <a href="https://workos.com/docs" target="_blank" rel="noreferrer" class="footer-card">
    <h4>Documentation</h4>
    <p>View integration guides and SDK documentation.</p>
  </a>
  
  <a href="https://workos.com/docs/reference" target="_blank" rel="noreferrer" class="footer-card">
    <h4>API Reference</h4>
    <p>Every WorkOS API method and endpoint documented.</p>
  </a>
  
  <a href="https://workos.com" target="_blank" rel="noreferrer" class="footer-card">
    <h4>WorkOS</h4>
    <p>Learn more about other WorkOS products.</p>
  </a>
</div>

<style>
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .footer-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
    border: 1px solid #e5e7eb;
  }

  .footer-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
</style>