import json, re, codecs, os

def parse_result_file(filepath):
    with open(filepath) as f:
        d = json.load(f)
    
    r = d['result']
    
    # Find the JSON in result='...' format
    m = re.search(r"result='(\{.*?\})'\s+error=", r, re.DOTALL)
    if not m:
        return None
    
    json_str = m.group(1)
    
    try:
        decoded = codecs.decode(json_str, 'unicode_escape')
        data = json.loads(decoded)
    except Exception as e:
        return None
    
    vp = d['viewport']['name']
    pg = d['page']['name']
    lm = data
    
    initial = lm.get('initial_theme', 'N/A')
    first = lm.get('after_first_click_theme', 'N/A')
    second = lm.get('after_second_click_theme', 'N/A')
    errors = lm.get('errors', [])
    
    # Handle None values
    if initial is None:
        initial = 'None'
    if first is None:
        first = 'None'
    if second is None:
        second = 'None'
    
    return {
        'viewport': vp,
        'initial': str(initial),
        'first_click': str(first),
        'second_click': str(second),
        'errors': errors,
    }

results_dir = '/root/edu-glossary/qa-results-theme-toggle-final'
files = [f for f in os.listdir(results_dir) if f.endswith('.json') and not f.startswith('combined')]

results = []
for f in sorted(files):
    try:
        r = parse_result_file(os.path.join(results_dir, f))
        if r:
            results.append(r)
        else:
            print(f"FAILED: {f}")
    except Exception as e:
        print(f"ERROR {f}: {e}")

print("=== THEME TOGGLE BEHAVIOR MATRIX ===")
print(f"{'Viewport':>8} | {'Initial':>10} | {'Light→Dark':>10} | {'Dark→Light':>10} | {'Status':>8}")
print("-" * 60)
for r in results:
    ltod = "PASS" if r['first_click'] == 'dark' else "FAIL"
    dtol = "PASS" if r['second_click'] == 'light' else "FAIL"
    status = "PASS" if r['first_click'] == 'dark' and r['second_click'] == 'light' else "FAIL"
    print(f"{r['viewport']:>8} | {str(r['initial']):>10} | {r['first_click']:>10} ({ltod}) | {r['second_click']:>10} ({dtol}) | {status:>8}")

print("\n=== SUMMARY ===")
total = len(results)
passed = sum(1 for r in results if r['first_click'] == 'dark' and r['second_click'] == 'light')
print(f"Total: {total}, Passed: {passed}, Failed: {total - passed}")

if passed == total and total > 0:
    print("✅ ALL VIEWPORTS PASS - Dark mode toggle working correctly!")
else:
    print("❌ SOME VIEWPORTS FAIL")