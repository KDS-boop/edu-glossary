const { chromium } = require('playwright');
const fs = require('fs');

async function auditSite() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const results = {
    timestamp: new Date().toISOString(),
    url: 'https://eduglossary.my.id/',
    checks: {}
  };

  try {
    // 1. Basic page load
    console.log('1. Testing page load...');
    const response = await page.goto('https://eduglossary.my.id/', { waitUntil: 'networkidle', timeout: 30000 });
    results.checks.pageLoad = {
      status: response.status(),
      statusText: response.statusText(),
      ok: response.ok()
    };
    console.log(`   Status: ${response.status()} ${response.statusText()}`);

    // 2. Check canonical URL
    console.log('2. Checking canonical URL...');
    const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => null);
    results.checks.canonical = canonical;
    console.log(`   Canonical: ${canonical}`);

    // 3. Check meta tags
    console.log('3. Checking meta tags...');
    const metaTags = await page.$$eval('meta', metas => metas.map(m => ({
      name: m.getAttribute('name') || m.getAttribute('property'),
      content: m.getAttribute('content')
    })));
    results.checks.metaTags = metaTags;
    console.log(`   Found ${metaTags.length} meta tags`);

    // 4. Check JSON-LD structured data
    console.log('4. Checking JSON-LD structured data...');
    const jsonLd = await page.$$eval('script[type="application/ld+json"]', scripts => 
      scripts.map(s => {
        try { return JSON.parse(s.textContent); } catch { return null; }
      }).filter(Boolean)
    );
    results.checks.jsonLd = jsonLd;
    console.log(`   Found ${jsonLd.length} JSON-LD blocks`);

    // 5. Check Open Graph / Twitter cards
    console.log('5. Checking OG/Twitter tags...');
    const ogTags = metaTags.filter(m => m.name && (m.name.startsWith('og:') || m.name.startsWith('twitter:')));
    results.checks.ogTwitter = ogTags;
    console.log(`   Found ${ogTags.length} OG/Twitter tags`);

    // 6. Check heading structure
    console.log('6. Checking heading structure...');
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', hs => 
      hs.map(h => ({ tag: h.tagName, text: h.textContent.trim() }))
    );
    results.checks.headings = headings;
    console.log(`   Found ${headings.length} headings`);

    // 7. Check links
    console.log('7. Checking links...');
    const links = await page.$$eval('a[href]', as => 
      as.map(a => ({ href: a.href, text: a.textContent.trim() })).slice(0, 50)
    );
    results.checks.links = { total: links.length, sample: links.slice(0, 20) };
    console.log(`   Found ${links.length} links`);

    // 8. Check images
    console.log('8. Checking images...');
    const images = await page.$$eval('img', imgs => 
      imgs.map(img => ({ 
        src: img.src, 
        alt: img.alt, 
        width: img.width, 
        height: img.height,
        hasAlt: !!img.alt && img.alt.trim() !== ''
      }))
    );
    results.checks.images = { 
      total: images.length, 
      withAlt: images.filter(i => i.hasAlt).length,
      withoutAlt: images.filter(i => !i.hasAlt).length
    };
    console.log(`   Images: ${images.length} total, ${images.filter(i => i.hasAlt).length} with alt`);

    // 9. Check for console errors
    console.log('9. Checking console errors...');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.waitForTimeout(2000);
    results.checks.consoleErrors = consoleErrors;
    console.log(`   Console errors: ${consoleErrors.length}`);

    // 10. Check robots.txt
    console.log('10. Checking robots.txt...');
    const robotsResponse = await page.goto('https://eduglossary.my.id/robots.txt', { waitUntil: 'networkidle' });
    const robotsText = await page.textContent('body').catch(() => null);
    results.checks.robotsTxt = { status: robotsResponse.status(), content: robotsText };
    console.log(`   Robots.txt status: ${robotsResponse.status()}`);

    // 11. Check sitemap
    console.log('11. Checking sitemap...');
    const sitemapResponse = await page.goto('https://eduglossary.my.id/sitemap-index.xml', { waitUntil: 'networkidle' });
    const sitemapText = await page.textContent('body').catch(() => null);
    results.checks.sitemap = { status: sitemapResponse.status(), hasContent: !!sitemapText };
    console.log(`   Sitemap status: ${sitemapResponse.status()}`);

    // 12. Mobile viewport check
    console.log('12. Checking mobile viewport...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://eduglossary.my.id/', { waitUntil: 'networkidle' });
    const viewport = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      devicePixelRatio: window.devicePixelRatio
    }));
    const hasViewportMeta = await page.$eval('meta[name="viewport"]', el => el.content).catch(() => null);
    results.checks.mobileViewport = { viewport, hasViewportMeta };
    console.log(`   Viewport: ${JSON.stringify(viewport)}, Meta: ${hasViewportMeta}`);

    // 13. Performance timing
    console.log('13. Collecting performance timing...');
    const perfTiming = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      return perf ? {
        domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
        loadComplete: perf.loadEventEnd - perf.loadEventStart,
        ttfb: perf.responseStart - perf.requestStart,
        domInteractive: perf.domInteractive - perf.fetchStart
      } : null;
    });
    results.checks.performanceTiming = perfTiming;
    console.log(`   Timing: ${JSON.stringify(perfTiming)}`);

    // 14. Check for security headers (via response)
    console.log('14. Checking security headers...');
    const headers = response.headers();
    const securityHeaders = {
      'content-security-policy': headers['content-security-policy'],
      'strict-transport-security': headers['strict-transport-security'],
      'x-frame-options': headers['x-frame-options'],
      'x-content-type-options': headers['x-content-type-options'],
      'referrer-policy': headers['referrer-policy'],
      'permissions-policy': headers['permissions-policy']
    };
    results.checks.securityHeaders = securityHeaders;
    console.log(`   Security headers: ${Object.entries(securityHeaders).filter(([k,v]) => v).length}/6 present`);

    // 15. Test key pages
    console.log('15. Testing key pages...');
    const keyPages = [
      { name: 'Glossary Index', url: 'https://eduglossary.my.id/glossary/' },
      { name: 'Blockchain Term', url: 'https://eduglossary.my.id/glossary/blockchain/' },
      { name: 'Cloud Article', url: 'https://eduglossary.my.id/articles/cloud-computing-explained/' },
      { name: 'Learn Blockchain', url: 'https://eduglossary.my.id/learn/blockchain/' }
    ];
    
    results.checks.keyPages = [];
    for (const kp of keyPages) {
      const r = await page.goto(kp.url, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => ({ status: () => 'error', ok: () => false }));
      const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => null);
      results.checks.keyPages.push({
        name: kp.name,
        url: kp.url,
        status: r.status(),
        ok: r.ok(),
        canonical
      });
      console.log(`   ${kp.name}: ${r.status()} ${r.ok() ? 'OK' : 'FAIL'} - Canonical: ${canonical}`);
    }

  } catch (error) {
    results.error = error.message;
    console.error('Audit error:', error);
  } finally {
    await browser.close();
  }

  // Save results
  fs.writeFileSync('/root/edu-glossary/audit-results.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Audit complete. Results saved to audit-results.json');
  
  return results;
}

auditSite().catch(console.error);