/**
 * Add a per-response CSP nonce so Cloudflare JavaScript Detections (JSD) can
 * authorize its injected inline bootstrap without weakening script-src.
 *
 * Keep the static CSP sources below in sync with public/_headers. Cloudflare
 * Pages does not apply _headers rules to responses handled by Pages Functions,
 * so this middleware reapplies the site's security headers to HTML responses
 * and the Monetag service worker. Other non-HTML assets use the _headers path.
 */
const CSP_WITH_NONCE = (nonce) =>
  `default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self' 'wasm-unsafe-eval' ${nonce ? `'nonce-${nonce}' ` : ''}'sha256-rsbI7dJwJSH7yyQaKM/GQC4O9vRhfa9usN6+ST2vhnI=' 'sha256-8ZYBhKyMtTbaQ3j40BsKk/SxA+2FQ5sjaxn/l/iOGuA=' 'sha256-zzubHYpULml5W1Ibkk/TFyyDPWL+mhicRYZGLdTyksE=' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://cdn-cookieyes.com https://*.cookieyes.com https://5gvci.com https://3nbf4.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.google.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com https://cdn-cookieyes.com https://*.cookieyes.com https://5gvci.com https://3nbf4.com; frame-src 'self' https://www.googletagmanager.com https://www.google.com; worker-src 'self' blob:; child-src 'self' blob:; frame-ancestors 'none'`;

function createNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';
  const isHtml = contentType.toLowerCase().includes('text/html');
  const isMonetagServiceWorker = new URL(context.request.url).pathname === '/sw.js';
  if (!isHtml && !isMonetagServiceWorker) return response;

  const headers = new Headers(response.headers);
  if (isMonetagServiceWorker) {
    headers.set('Content-Security-Policy', CSP_WITH_NONCE(null));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  const nonce = createNonce();
  headers.set('Content-Security-Policy', CSP_WITH_NONCE(nonce));
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  // A response-specific nonce must not be reused from an intermediary cache.
  headers.set('Cache-Control', 'no-store');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
