#!/usr/bin/env python3
"""
Test dark mode toggle behavior at all viewports
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

BASE_URL = "https://eduglossary.my.id/glossary/blockchain/"
OUTPUT_DIR = "qa-results-theme-toggle-final"


async def run_qa_task(client, viewport):
    task = f"""
    Navigate to {BASE_URL} with viewport {viewport['width']}x{viewport['height']}.
    
    1. Get the initial theme (check data-theme attribute on html element)
    2. Click the theme toggle button (#theme-toggle)
    4. Wait 500ms
    5. Get the theme after click (check data-theme attribute on html element)
    6. Click the theme toggle button again
    7. Wait 500ms
    8. Get the theme after second click
    
    Return JSON with:
    - initial_theme
    - after_first_click_theme
    - after_second_click_theme
    - any errors
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
            print(f"  🔍 Testing theme toggle...")
            try:
                result = await run_qa_task(client, vp)
                result_data = {
                    "viewport": vp, "page": {"name": "glossary-detail", "path": "/glossary/blockchain/"},
                    "url": BASE_URL, "timestamp": datetime.now(timezone.utc).isoformat(),
                    "result": result,
                }
                all_results.append(result_data)
                out_file = f"{OUTPUT_DIR}/{vp['name']}-theme-toggle.json"
                with open(out_file, "w") as f:
                    json.dump(result_data, f, indent=2, default=str)
                print(f"    ✅ Saved to {out_file}")
            except Exception as e:
                print(f"    ❌ Error: {e}")
                all_results.append({"viewport": vp, "page": {"name": "glossary-detail"}, "url": BASE_URL, "error": str(e)})

    combined_file = f"{OUTPUT_DIR}/combined-{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}.json"
    with open(combined_file, "w") as f:
        json.dump(all_results, f, indent=2, default=str)
    print(f"\n📊 Combined: {combined_file}")
    print(f"📈 Summary: {sum(1 for r in all_results if 'error' not in r)}/{len(all_results)} passed")
    return all_results


if __name__ == "__main__":
    asyncio.run(main())