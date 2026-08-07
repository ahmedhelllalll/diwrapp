import os
import json
import re

brain_dir = r'C:\Users\Helal\.gemini\antigravity-ide\brain'
out = ""

for conv_dir in os.listdir(brain_dir):
    transcript_path = os.path.join(brain_dir, conv_dir, '.system_generated', 'logs', 'transcript_full.jsonl')
    if os.path.exists(transcript_path):
        try:
            with open(transcript_path, 'r', encoding='utf-8') as f:
                for line in f:
                    try:
                        d = json.loads(line)
                        if d.get('type') == 'TOOL_RESPONSE' and 'landing.css' in str(d):
                            content = d.get('content', '')
                            if 'The following code has been modified to include a line number' in content and 'landing.css' in content:
                                out = content
                    except:
                        pass
        except:
            pass
        if out:
            print(f"Found in {conv_dir}")
            break

if out:
    lines = out.split('\n')
    clean_lines = []
    started = False
    for line in lines:
        if line.startswith('1: '):
            started = True
        if started:
            if line.startswith('The above content shows the entire') or line.startswith('Please note that the above snippet only shows the MODIFIED lines'):
                break
            clean_line = re.sub(r'^\d+:\s', '', line)
            clean_lines.append(clean_line)
    
    with open(r'c:\Users\Helal\Desktop\Diwrapp\next-temp\src\app\landing.css', 'w', encoding='utf-8') as out_f:
        out_f.write('\n'.join(clean_lines))
    print("Recovered landing.css.")
else:
    print("Could not find full landing.css anywhere.")
