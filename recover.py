import json
import re

out = ""
with open(r'C:\Users\Helal\.gemini\antigravity-ide\brain\0e469f88-74e6-4d38-afff-955eb2b4a344\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        try:
            d = json.loads(line)
            # Find a view_file response for landing.css
            if d.get('type') == 'TOOL_RESPONSE' and 'landing.css' in str(d):
                content = d.get('content', '')
                if 'The following code has been modified to include a line number' in content and 'landing.css' in content:
                    out = content
        except Exception as e:
            pass

if out:
    # Remove line numbers from the output
    lines = out.split('\n')
    clean_lines = []
    started = False
    for line in lines:
        if line.startswith('1: '):
            started = True
        if started:
            if line.startswith('The above content shows the entire'):
                break
            # Remove "line_num: " prefix
            clean_line = re.sub(r'^\d+:\s', '', line)
            clean_lines.append(clean_line)
    
    with open('src/app/landing.css', 'w', encoding='utf-8') as out_f:
        out_f.write('\n'.join(clean_lines))
    print("Recovered landing.css")
else:
    print("Could not find landing.css in transcript")
