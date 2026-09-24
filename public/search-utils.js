/**
 * Shared Pagefind search enhancement utilities.
 * Used by Header.astro and index.astro.
 *
 * Exposes: window.__eduglossary.search.init(selector, pagefindOpts)
 */
(function () {
  if (window.__eduglossary && window.__eduglossary.search) return;

  function enrichResults(container) {
    if (!container) return;
    var results = container.querySelectorAll('.pagefind-ui__result');
    results.forEach(function (result) {
      if (result.dataset.enriched) return;
      result.dataset.enriched = 'true';

      var link = result.querySelector('.pagefind-ui__result-link');
      if (!link) return;
      var href = link.getAttribute('href') || '';

      var type = '';
      var typeLabel = '';
      if (href.includes('/glossary/')) {
        type = 'glossary';
        typeLabel = 'Glossary';
      } else if (href.includes('/articles/')) {
        type = 'article';
        typeLabel = 'Article';
      }

      if (type) {
        var inner = result.querySelector('.pagefind-ui__result-inner');
        if (inner && !inner.querySelector('.search-result-meta')) {
          var meta = document.createElement('div');
          meta.className = 'search-result-meta';
          meta.innerHTML =
            '<span class="search-result-type search-result-type--' +
            type +
            '">' +
            typeLabel +
            '</span>';
          var excerpt = inner.querySelector('.pagefind-ui__result-excerpt');
          if (excerpt) {
            excerpt.parentNode.insertBefore(meta, excerpt);
          } else {
            inner.appendChild(meta);
          }
        }
      }
    });
  }

  function watchForEmptyState(container) {
    if (!container) return;
    var existingEmpty = null;

    var observer = new MutationObserver(function () {
      var resultsContainer = container.querySelector('.pagefind-ui__results');
      var message = container.querySelector('.pagefind-ui__message');

      // Empty state: message is visible AND results container has no result children.
      // Avoids parsing human-readable text ("Ditemukan 0 hasil untuk ...").
      var isEmpty =
        message &&
        resultsContainer &&
        resultsContainer.querySelectorAll('.pagefind-ui__result').length === 0;

      if (isEmpty && !existingEmpty) {
        var emptyDiv = document.createElement('div');
        emptyDiv.className = 'search-empty';
        emptyDiv.innerHTML =
          '<svg class="search-empty-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>' +
          '<h3>No results found</h3>' +
          '<p>Try a different search term or explore our content directly.</p>' +
          '<div class="search-empty-actions">' +
          '<a href="/glossary/">Browse Glossary</a>' +
          '<a href="/glossary/categories/">View Categories</a>' +
          '<a href="/articles/">Read Articles</a>' +
          '</div>';
        container.appendChild(emptyDiv);
        existingEmpty = emptyDiv;
      } else if (existingEmpty && !isEmpty) {
        existingEmpty.remove();
        existingEmpty = null;
      }

      if (resultsContainer) {
        enrichResults(container);
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    // Disconnect after 5 seconds — all initial mutations (search, clear, re-search)
    // will have fired by then, avoiding unbounded observer growth.
    setTimeout(function () {
      observer.disconnect();
    }, 5000);
  }

  function init(selector, pagefindOpts) {
    if (!window.PagefindUI) return null;
    var opts = Object.assign({ element: selector, showSubResults: true }, pagefindOpts || {});
    var ui = new PagefindUI(opts);
    var container = document.querySelector(selector);
    watchForEmptyState(container);
    enrichResults(container);
    return ui;
  }

  window.__eduglossary = {
    search: { init: init, enrichResults: enrichResults, watchForEmptyState: watchForEmptyState },
  };
})();
