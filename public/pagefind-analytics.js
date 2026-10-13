(() => {
  const MIN_QUERY_LENGTH = 3;
  const SEARCH_IDLE_MS = 1200;
  const SEARCH_INSTANCES = ['header', 'hero'];

  const categoryFor = (href) => {
    if (href.startsWith('/glossary/')) return 'glossary';
    if (href.startsWith('/articles/')) return 'article';
    return 'other';
  };

  const hasAnalyticsConsent = () => {
    try {
      const entry = document.cookie
        .split(';')
        .map((part) => part.trim())
        .find((part) => part.startsWith('cookieyes-consent='));
      if (!entry) return false;

      const value = decodeURIComponent(entry.slice('cookieyes-consent='.length));
      const consent = {};
      for (const item of value.split(',')) {
        const separator = item.indexOf(':');
        if (separator < 0) continue;
        const key = item.slice(0, separator).trim();
        consent[key] = item.slice(separator + 1).trim().toLowerCase();
      }

      return consent.consent === 'yes' && consent.analytics === 'yes';
    } catch {
      // A missing or malformed consent signal must fail closed.
      return false;
    }
  };

  const pushAnalyticsEvent = (payload) => {
    // Send events directly to GA4; never queue pre-consent interactions.
    if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') return;

    const { event, ...parameters } = payload;
    window.gtag('event', event, {
      ...parameters,
      page_path: window.location.pathname,
    });
  };

  const attachAnalytics = () => {
    const manager = window.PagefindComponents?.getInstanceManager?.();
    if (!manager) return false;

    for (const instanceName of SEARCH_INSTANCES) {
      const box = document.querySelector(`pagefind-searchbox[instance="${instanceName}"]`);
      if (!box || box.dataset.eduglossaryAnalyticsBound === 'true') continue;

      const instance = manager.getInstance(instanceName);
      if (!instance || typeof instance.on !== 'function') continue;

      const state = {
        term: '',
        timer: 0,
        lastReportedTerm: '',
        lastZeroReportedTerm: '',
      };

      const reportZeroResults = () => {
        const input = box.querySelector('input');
        const status = box.querySelector('.pf-searchbox-status');
        const term = state.term;
        if (
          !input || !status || status.hidden ||
          !status.classList.contains('pf-searchbox-empty') ||
          term.length < MIN_QUERY_LENGTH ||
          input.value.trim() !== term ||
          !(status.textContent || '').includes(term) ||
          state.lastReportedTerm !== term ||
          state.lastZeroReportedTerm === term
        ) return;

        state.lastZeroReportedTerm = term;
        pushAnalyticsEvent({
          event: 'eduglossary_search_zero_results',
          search_instance: instanceName,
          search_query_length: term.length,
        });
      };

      const reportStableSearch = () => {
        const input = box.querySelector('input');
        const term = state.term;
        if (
          !input || term.length < MIN_QUERY_LENGTH ||
          input.value.trim() !== term || state.lastReportedTerm === term
        ) return;

        state.lastReportedTerm = term;
        pushAnalyticsEvent({
          event: 'eduglossary_search',
          search_instance: instanceName,
          search_query_length: term.length,
        });
        reportZeroResults();
      };

      box.dataset.eduglossaryAnalyticsBound = 'true';

      // Keep the query only in memory; raw text is never sent to analytics.
      instance.on('search', (term) => {
        const nextTerm = typeof term === 'string' ? term.trim() : '';
        if (nextTerm === state.term) return;

        window.clearTimeout(state.timer);
        state.term = nextTerm;
        state.lastReportedTerm = '';
        state.lastZeroReportedTerm = '';

        if (nextTerm.length >= MIN_QUERY_LENGTH) {
          state.timer = window.setTimeout(reportStableSearch, SEARCH_IDLE_MS);
        }
      });

      // Detect zero-result state from the rendered component, not from a
      // possibly stale asynchronous results callback. Confirm the visible
      // status corresponds to the current input before emitting the event.
      const observer = new MutationObserver(reportZeroResults);
      observer.observe(box, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'hidden'],
      });

      box.addEventListener('click', (event) => {
        const target = event.target instanceof Element ? event.target : event.target?.parentElement;
        const result = target?.closest('a.pf-searchbox-result');
        if (!result || !box.contains(result)) return;

        const href = result.getAttribute('href') || '';
        const displayedResults = [...box.querySelectorAll('a.pf-searchbox-result')];
        let resultPath = '';
        try {
          const url = new URL(href, window.location.origin);
          if (url.origin === window.location.origin) resultPath = url.pathname;
        } catch {
          // Ignore malformed or non-URL result targets.
        }

        pushAnalyticsEvent({
          event: 'eduglossary_search_result_click',
          search_instance: instanceName,
          search_result_type: categoryFor(href),
          search_result_position: displayedResults.indexOf(result) + 1,
          search_result_is_subresult: result.classList.contains('pf-searchbox-subresult'),
          result_path: resultPath,
        });
      });
    }

    return true;
  };

  customElements.whenDefined('pagefind-searchbox').then(() => {
    if (attachAnalytics()) return;
    // Covers a slow module initialization without polling or duplicate hooks.
    window.addEventListener('load', attachAnalytics, { once: true });
  });
})();
