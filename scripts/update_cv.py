#!/usr/bin/env python3
"""Publish a compiled CV to both local paths and refresh the page's PDF version."""
import argparse
import hashlib
from pathlib import Path
import re

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('pdf', type=Path, help='Compiled CV PDF')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
data = args.pdf.read_bytes()
if not data.startswith(b'%PDF-'):
    parser.error('Input must be a compiled PDF file')
version = hashlib.sha256(data).hexdigest()[:12]
page = root / '_pages/cv.html'
text, count = re.subn(
    r'/files/Hyeongjin_Kim_CV\.pdf(?:\?v=[a-zA-Z0-9-]+)?',
    f'/files/Hyeongjin_Kim_CV.pdf?v={version}', page.read_text(encoding='utf-8'))
if count == 0:
    parser.error('No CV references found in _pages/cv.html; nothing changed')
for target in ('files/Hyeongjin_Kim_CV.pdf', 'Academic_CV/Academic_CV.pdf'):
    (root / target).write_bytes(data)
page.write_text(text, encoding='utf-8')
print(f'Updated both CV copies and {count} links; version {version}')
