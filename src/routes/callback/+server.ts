import { error, redirect } from '@sveltejs/kit';
import { authKit } from '$lib/authkit/index.js';
import { getWorkOS, getConfig } from '@workos-inc/authkit-ssr';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  
  if (!code) {
    throw error(400, 'Missing authorization code');
  }

  try {
    // Authenticate with WorkOS using the authorization code
    const workos = getWorkOS();
    const authResponse = await workos.userManagement.authenticateWithCode({
      code,
      clientId: getConfig('clientId')
    });

    // Decode state to get return path
    let returnPath = '/';
    if (state) {
      try {
        const decoded = JSON.parse(atob(state));
        returnPath = decoded.returnPathname || '/';
      } catch {
        // Invalid state, use default return path
      }
    }

    // Create redirect response
    let response = new Response(null, {
      status: 302,
      headers: { 
        'Location': returnPath
      }
    });

    // Create a proper session with encryption
    const session = {
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
      user: authResponse.user,
      impersonator: authResponse.impersonator
    };

    // Encrypt the session before saving
    const { SvelteKitSessionEncryption } = await import('$lib/authkit/encryption.js');
    const { SvelteKitStorage } = await import('$lib/authkit/storage.js');
    
    const encryption = new SvelteKitSessionEncryption();
    const storage = new SvelteKitStorage();
    
    const cookiePassword = getConfig('cookiePassword');
    const encryptedSession = await encryption.sealData(session, { password: cookiePassword });
    response = await storage.saveSession(response, encryptedSession);
    
    return response;
  } catch (err) {
    console.error('Authentication error:', err);
    throw error(500, 'Authentication failed');
  }
};