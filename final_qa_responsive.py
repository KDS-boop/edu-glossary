#!/usr/bin/env python3
"""
Final P4 QA - Responsive check
"""

import asyncio
import os
import json
import sys
from datetime import datetime, timezone
from browser_use_sdk.v4 import AsyncBrowserUse

VIEWPORTS = [
    {"width": 360, "height": 740, "name": "360"},
    {"width": 390, "height": 844, "name": "390"},
    {"width": 480, "height": 800, "name": "480"},
    {"width": 768, "height": 1024, "name": "768"},
    {"width": 820, "height": 1180, "name": "820"},
    {"width": 1024, "height": 768, "name": "1024"},
    {"width": 1280, "height": 800, "name": "1280"},
    {"width": 1440, "height": 900, "name": "1440"},
]

PAGES = [
    {"path": "/", "name": "home"},
    {"path": "/glossary/", "name": "glossary"},
    {"path": "/glossary/blockchain/", "name": "blockchain"},
    {"path": "/articles/", "name": "articles"},
    {"path": "/glossary/categories/", "name": "categories"},
]

BASE_URL = "https://eduglossary.my.id"
OUTPUT_DIR = "qa-final-responsive"


async def run_qa_task(client, viewport, page_config):
    task = f"""
    Navigate to {BASE_URL}{page_config['path']} with viewport {viewport['width']}x{viewport['height']}.
    
    Return JSON with:
    - overflow: document.documentElement.scrollWidth, document.documentElement.clientWidth, hasOverflow
    """

    run = await client.runs.create(
        task=task,
        model="gpt-6-luna",
        model_params={"reasoning": {"effort": "low"}, "service_tier": "default"},
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