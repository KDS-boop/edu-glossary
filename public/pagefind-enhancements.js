(() => {
  const categoryFor = (href) => {
    if (href.startsWith('/glossary/')) return 'glossary';
    if (href.startsWith('/articles/')) return 'article';
    return null;
  };

  const addResultLabels = (box) => {
    for (const result of box.querySelectorAll('a.pf-searchbox-result:not([data-eduglossary-labeled])')) {
      const type = categoryFor(result.getAttribute('href') || '');
      const title = result.querySelector('.pf-searchbox-result-title');
      if (!type || !title) continue;

      const label = document.createElement('span');
      label.className = `search-result-type search-result-type--${type}`;
      label.textContent = type === 'glossary' ? 'Glossary' : 'Article';
      title.insertAdjacentElement('afterend', label);
      result.dataset.eduglossaryLabeled = 'true';
    }
  };

  const addEmptyStateLinks = (box) => {
    const dropdown = box.querySelector('.pf-searchbox-dropdown');
    if (!dropdown) return;

    const emptyState = dropdown.querySelector('.pf-searchbox-empty');
    const actions = dropdown.querySelector('.search-empty-actions');
    const hasQuery = Boolean(box.querySelector('input')?.value.trim());

    if (!emptyState || !hasQuery) {
      actions?.remove();
      return;
    }
    if (actions) return;

    const links = [
      { href: '/glossary/', text: 'Browse Glossary' },
      { href: '/glossary/categories/', text: 'View Categories' },
      { href: '/articles/', text: 'Read Articles' },
    ];
    const group = document.createElement('div');
    group.className = 'search-empty-actions';
    group.setAttribute('aria-label', 'Explore EduGlossary');
    for (const item of links) {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.text;
      group.appendChild(link);
    }
    emptyState.insertAdjacentElement('afterend', group);
  };

  const clearStaleActiveDescendant = (box) => {
    const input = box.querySelector('input[aria-activedescendant]');
    if (!input) return;

    const activeId = input.getAttribute('aria-activedescendant');
    if (activeId && ![...box.querySelectorAll('[id]')].some((element) => element.id === activeId)) {
      input.removeAttribute('aria-activedescendant');
    }
  };

  const enhance = (box) => {
    clearStaleActiveDescendant(box);
    addResultLabels(box);
    addEmptyStateLinks(box);
  };

  const start = () => {
    document.querySelectorAll('pagefind-searchbox').forEach((box) => {
      const observer = new MutationObserver(() => enhance(box));
      observer.observe(box, { childList: true, subtree: true });
      enhance(box);
    });
  };

  customElements.whenDefined('pagefind-searchbox').then(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }
  });
})();
