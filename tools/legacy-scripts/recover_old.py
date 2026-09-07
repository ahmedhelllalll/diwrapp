import json
import re

out = ""
transcript_path = r'C:\Users\Helal\.gemini\antigravity-ide\brain\6446918d-4835-4a86-bcea-51fd38c2b208\.system_generated\logs\transcript_full.jsonl'

try:
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                d = json.loads(line)
                if d.get('type') == 'TOOL_RESPONSE' and 'landing.css' in str(d):
                    content = d.get('content', '')
                    if 'The following code has been modified to include a line number' in content and 'landing.css' in content:
                        out = content
            except Exception as e:
                pass
except Exception as e:
    print("Error opening transcript:", e)

if out:
    lines = out.split('\n')
    clean_lines = []
    started = False
    for line in lines:
        if line.startswith('1: '):
            started = True
        if started:
            if line.startswith('The above content shows the entire'):
                break
            clean_line = re.sub(r'^\d+:\s', '', line)
            clean_lines.append(clean_line)
    
    with open(r'c:\Users\Helal\Desktop\Diwrapp\next-temp\src\app\landing.css', 'w', encoding='utf-8') as out_f:
        out_f.write('\n'.join(clean_lines))
    print("Recovered landing.css from previous conversation.")
else:
    print("Could not find landing.css in previous transcript.")
