import json, re, codecs

with open('/root/edu-glossary/qa-results-theme-toggle-1280/1280-theme-toggle.json') as f:
    d = json.load(f)

r = d['result']
idx = r.find('```json')
if idx >= 0:
    start = idx + 7
    end = r.find('\n```', start)
    if end >= 0:
        json_str = r[start:end]
        decoded = codecs.decode(json_str, 'unicode_escape')
        data = json.loads(decoded)
        print(json.dumps(data, indent=2))