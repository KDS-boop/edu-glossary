#!/usr/bin/env python3
"""
Test dark mode toggle at 1024px only
"""

import asyncio
import os
import json
import sys
from datetime import datetime, timezone
from browser_use_sdk.v4 import AsyncBrowserUse

VIEWPORTS = [
    {"width": 1024, "height": 768, "name": "1024"},
]

BASE_URL = "https://eduglossary.my.id/glossary/blockchain/"
OUTPUT_DIR = "qa-results-theme-toggle-1024-retry"


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

    async with AsyncBrowserUse(api_key=api_key) as client:
        vp = VIEWPORTS[0]
        print(f"\n📱 {vp['name']}px ({vp['width']}x{vp['height']})")
        print(f"  🔍 Testing theme toggle...")
        try:
            result = await run_qa_task(client, vp)
            result_data = {
                "viewport": vp, "page": {"name": "glossary-detail", "path": "/glossary/blockchain/"},
                "url": BASE_URL, "timestamp": datetime.now(timezone.utc).isoformat(),
                "result": result,
            }
            out_file = f"{OUTPUT_DIR}/{vp['name']}-theme-toggle.json"
            with open(out_file, "w") as f:
                json.dump(result_data, f, indent=2, default=str)
            print(f"    ✅ Saved to {out_file}")
        except Exception as e:
            print(f"    ❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())