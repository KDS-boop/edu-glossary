import json, re, codecs

with open('/root/edu-glossary/qa-results-theme-toggle-final/1280-theme-toggle.json') as f:
    d = json.load(f)

r = d['result']
idx = r.find('```json')
if idx >= 0:
    start = idx + 7
    end = r.find('\n```', start)
    if end >= 0:
        json_str = r[start:end]
        print('Length:', len(json_str))
        print('First 500:', json_str[:500])
        try:
            decoded = codecs.decode(json_str, 'unicode_escape')
            data = json.loads(decoded)
            print('Parsed:', data)
        except Exception as e:
            print('Error:', e)