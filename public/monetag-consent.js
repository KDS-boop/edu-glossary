(() => {
  const zoneId = '12211775';
  const tagUrl = `https://5gvci.com/act/files/tag.min.js?z=${zoneId}`;
  let tagLoaded = false;

  const isGranted = (value) => value === true || value === 1 ||
    (typeof value === 'string' && ['yes', 'true', 'granted'].includes(value.toLowerCase()));

  function loadMonetag(categories) {
    if (!categories || !isGranted(categories.advertisement) || tagLoaded) return;
    tagLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = tagUrl;
    (document.head || document.documentElement).appendChild(script);
  }

  function onBannerLoad(event) {
    const categories = event && event.detail && event.detail.categories;
    if (categories) loadMonetag(categories);
  }

  function onConsentUpdate(event) {
    const detail = event && event.detail;
    if (!detail) return;
    if (detail.categories) {
      loadMonetag(detail.categories);
    } else if (Array.isArray(detail.accepted)) {
      loadMonetag({ advertisement: detail.accepted.includes('advertisement') });
    }
  }

  document.addEventListener('cookieyes_banner_load', onBannerLoad);
  document.addEventListener('cookieyes_consent_update', onConsentUpdate);

  // Returning visitors: load only when the saved CookieYes state explicitly
  // grants advertising consent. Unknown or missing consent remains blocked.
  try {
    const match = document.cookie.match(/(?:^|;\s*)cookieyes-consent=([^;]*)/);
    if (match) {
      const state = {};
      decodeURIComponent(match[1]).split(',').forEach((item) => {
        const parts = item.split(':');
        if (parts.length === 2) state[parts[0].trim()] = parts[1].trim().toLowerCase() === 'yes';
      });
      if (state.consent === true) loadMonetag(state);
    }
  } catch (_) {
    // Fail closed if consent state cannot be parsed.
  }
})();
