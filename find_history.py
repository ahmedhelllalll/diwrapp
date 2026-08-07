import os
import re

history_dir = os.path.expandvars(r'%APPDATA%\Code\User\History')
found = False
for root, dirs, files in os.walk(history_dir):
    for f in files:
        path = os.path.join(root, f)
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                if 'split-overlay' in content and 'LandingHeaderProps' not in content and 'landing-header' in content:
                    print(f"Found landing.css in {path} (length: {len(content)})")
                    found = True
        except:
            pass

if not found:
    print("Not found")
