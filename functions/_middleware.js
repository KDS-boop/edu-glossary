/**
 * Add a per-response CSP nonce so Cloudflare JavaScript Detections (JSD) can
 * authorize its injected inline bootstrap without weakening script-src.
 *
 * Keep the static CSP sources below in sync with public/_headers. Cloudflare
 * Pages does not apply _headers rules to responses handled by Pages Functions,
 * so this middleware also reapplies the site's existing security headers to
 * HTML responses. Non-HTML assets continue through the normal _headers path.
 */
const CSP_WITH_NONCE = (nonce) =>
  `default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self' 'wasm-unsafe-eval' 'nonce-${nonce}' 'sha256-cLouQBJo2Kfl1xEdTUY5Fq1OOYvZ0Zi1em3sv8UirwM=' 'sha256-8ZYBhKyMtTbaQ3j40BsKk/SxA+2FQ5sjaxn/l/iOGuA=' 'sha256-m8q848Ospi8468f9jG0aPOOBDHeCQ7i8JXnY2TC/i98=' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://cdn-cookieyes.com https://*.cookieyes.com https://ep2.adtrafficquality.google; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com https://*.g.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://*.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://c.bing.com https://cdn-cookieyes.com https://*.cookieyes.com https://ep1.adtrafficquality.google; frame-src 'self' https://www.googletagmanager.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google.com; worker-src 'self' blob:; child-src 'self' blob:; frame-ancestors 'none'`;

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
  if (!contentType.toLowerCase().includes('text/html')) return response;

  const nonce = createNonce();
  const headers = new Headers(response.headers);
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
