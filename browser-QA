#!/usr/bin/env python3
"""
Browser Use Cloud V4 - Quick Production QA (Smoke Test)
EduGlossary — https://eduglossary.my.id

Tests only key viewports and pages for quick validation.
"""

import asyncio
import os
import json
import sys
from datetime import datetime, timezone
from browser_use_sdk.v4 import AsyncBrowserUse

# Reduced set for quick smoke test
VIEWPORTS = [
    {"width": 360, "height": 740, "name": "360"},
    {"width": 768, "height": 1024, "name": "768"},
    {"width": 1280, "height": 800, "name": "1280"},
    {"width": 1440, "height": 900, "name": "1440"},
]

PAGES = [
    {"path": "/", "name": "homepage"},
    {"path": "/articles/retrieval-augmented-generation/", "name": "article"},
    {"path": "/glossary/blockchain/", "name": "glossary-detail"},
]

BASE_URL = "https://eduglossary.my.id"
OUTPUT_DIR = "qa-results"


async def run_qa_task(client, viewport, page_config):
    task = f"""
    Navigate to {BASE_URL}{page_config['path']} with viewport {viewport['width']}x{viewport['height']}.
    
    1. Take full-page screenshot
    2. Extract computed styles and token values via JavaScript
    3. Toggle dark mode (click #theme-toggle), re-extract
    4. Return all data as JSON
    
    JavaScript to execute:
    
    (() => {{
      const selectors = {{
        'body': ['font-family', 'font-size', 'line-height', 'font-weight', 'letter-spacing'],
        'h1': ['font-size', 'font-weight', 'line-height', 'letter-spacing'],
        'h2': ['font-size', 'font-weight', 'line-height'],
        'h3': ['font-size', 'font-weight', 'line-height'],
        '.prose': ['font-size', 'line-height', 'max-width'],
        '.prose p': ['font-size', 'line-height', 'max-width', 'color'],
        '.hero h1': ['font-size', 'font-weight', 'line-height', 'letter-spacing'],
        '.hero-subtitle': ['font-size', 'font-weight', 'line-height', 'color'],
        '.badge': ['font-size', 'font-weight'],
        '.card-title': ['font-size', 'font-weight', 'line-height'],
        '.featured-card-title': ['font-size', 'font-weight', 'line-height'],
      }};
      
      const results = {{}};
      for (const [sel, props] of Object.entries(selectors)) {{
        const els = document.querySelectorAll(sel);
        if (els.length > 0) {{
          const cs = window.getComputedStyle(els[0]);
          results[sel] = {{}};
          for (const p of props) results[sel][p] = cs.getPropertyValue(p);
        }} else {{ results[sel] = {{error: 'Element not found'}}; }}
      }}
      
      results['_overflow'] = {{
        scrollWidth: document.body.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.body.scrollWidth > document.documentElement.clientWidth
      }};
      
      const root = window.getComputedStyle(document.documentElement);
      const vars = ['--font-sans','--text-body','--text-lead','--text-h1','--text-h2','--text-h3','--text-h4',
        '--leading-relaxed','--leading-loose','--leading-snug','--leading-ultra-tight',
        '--container-max','--prose-max','--content-max',
        '--color-primary','--color-bg','--color-text','--color-text-muted',
        '--space-4','--space-5','--radius-md','--radius-lg',
        '--shadow-card','--shadow-md'];
      results['_css_vars'] = {{}};
      for (const v of vars) results['_css_vars'][v] = root.getPropertyValue(v).trim();
      
      results['_inter_check'] = {{
        fontFamilyBody: document.body ? window.getComputedStyle(document.body).fontFamily : 'N/A',
        fontsCheck: document.fonts ? document.fonts.check('16px "Inter"') : false
      }};
      
      results['_dark_mode'] = {{
        hasDataTheme: document.documentElement.hasAttribute('data-theme'),
        themeValue: document.documentElement.getAttribute('data-theme') || 'light'
      }};
      
      return JSON.stringify(results, null, 2);
    }})();
    
    Then click #theme-toggle, wait 500ms, re-extract _css_vars and _dark_mode.
    Return combined JSON with light_mode and dark_mode sections.
    """

    run = await client.runs.create(
        task=task,
        model="gpt-5.6-luna",
        model_params={"reasoning": {"effort": "medium"}, "service_tier": "default"},
        browser_settings={
            "proxy_country_code": "us",
            "screen_width": viewport["width"],
            "screen_height": viewport["height"],
            "record": True,
        },
    )
    return await client.runs.wait_for_completion(run.id)


async def main():
    api_key = os.environ.get("BROWSER_USE_API_KEY")
    if not api_key:
        print("❌ Export BROWSER_USE_API_KEY first")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    all_results = []

    async with AsyncBrowserUse(api_key=api_key) as client:
        for vp in VIEWPORTS:
            print(f"\n📱 {vp['name']}px ({vp['width']}x{vp['height']})")
            for page in PAGES:
                url = BASE_URL + page['path']
                print(f"  🔍 {page['name']} ({url})")
                try:
                    result = await run_qa_task(client, vp, page)
                    result_data = {
                        "viewport": vp, "page": page, "url": url,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                        "result": result,
                    }
                    all_results.append(result_data)
                    out_file = f"{OUTPUT_DIR}/{vp['name']}-{page['name']}.json"
                    with open(out_file, "w") as f:
                        json.dump(result_data, f, indent=2, default=str)
                    print(f"    ✅ Saved to {out_file}")
                except Exception as e:
                    print(f"    ❌ Error: {e}")
                    all_results.append({"viewport": vp, "page": page, "url": url, "error": str(e)})

    combined_file = f"{OUTPUT_DIR}/combined-{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}.json"
    with open(combined_file, "w") as f:
        json.dump(all_results, f, indent=2, default=str)
    print(f"\n📊 Combined: {combined_file}")
    print(f"📈 Summary: {sum(1 for r in all_results if 'error' not in r)}/{len(all_results)} passed")
    return all_results


if __name__ == "__main__":
    asyncio.run(main())
