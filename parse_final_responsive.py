import json, re, codecs, os

def parse_result_file(filepath):
    with open(filepath) as f:
        d = json.load(f)
    
    r = d['result']
    start_idx = r.find('```json')
    if start_idx < 0:
        return None
    start_idx += 7
    end_idx = r.find('```', start_idx)
    if end_idx < 0:
        return None
    
    json_str = r[start_idx:end_idx]
    
    try:
        decoded = codecs.decode(json_str, 'unicode_escape')
        data = json.loads(decoded)
    except Exception as e:
        return None
    
    vp = d['viewport']['name']
    pg = d['page']['name']
    lm = data
    
    overflow = lm.get('overflow', {}).get('hasOverflow', 'N/A')
    scroll_w = lm.get('overflow', {}).get('scrollWidth', 'N/A')
    client_w = lm.get('overflow', {}).get('clientWidth', 'N/A')
    
    return {
        'viewport': vp, 'page': pg,
        'overflow': overflow,
        'scrollWidth': scroll_w,
        'clientWidth': client_w,
    }

results_dir = '/root/edu-glossary/qa-final-responsive'
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

print("=== RESPONSIVE OVERFLOW MATRIX ===")
print(f"{'Viewport':>8} | {'Page':>12} | {'Overflow':>8} | {'scrollW':>7} | {'clientW':>7}")
print("-" * 60)
for r in results:
    print(f"{r['viewport']:>8} | {r['page']:>12} | {str(r['overflow']):>8} | {str(r['scrollWidth']):>7} | {str(r['clientWidth']):>7}")

print("\n=== SUMMARY ===")
overflow_fails = [r for r in results if r['overflow'] == True]
print(f"Total tests: {len(results)}")
print(f"Overflow failures: {len(overflow_fails)}")
if overflow_fails:
    for r in overflow_fails:
        print(f"  FAIL: {r['viewport']} {r['page']} (scrollW={r['scrollWidth']}, clientW={r['clientWidth']})")
else:
    print("  ✅ NO OVERFLOW at any viewport!")