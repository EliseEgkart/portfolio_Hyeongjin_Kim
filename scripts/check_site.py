#!/usr/bin/env python3
"""Check built routes/assets/fragments with Python's standard library only."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys, re, json
root = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
base = (sys.argv[2] if len(sys.argv) > 2 else '/portfolio_Hyeongjin_Kim').rstrip('/')
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.links, self.ids, self.images = path, [], set(), []
        self.h1 = self.objects = 0
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, pairs):
        a = dict(pairs)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'object': self.objects += 1
        for attr in ('href', 'src', 'data' if tag == 'object' else '_unused'):
            if a.get(attr): self.links.append((tag, a[attr]))
        if tag == 'img': self.images.append(a)
pages = {p.resolve(): Page(p) for p in root.rglob('*.html')}
errors, checked, external = [], 0, set()
for path, page in pages.items():
    redirect = 'http-equiv="refresh"' in path.read_text().lower()
    if not redirect and page.h1 != 1: errors.append(f'{path.relative_to(root)}: expected one h1, found {page.h1}')
    for im in page.images:
        if 'alt' not in im: errors.append(f'{path.relative_to(root)}: image missing alt')
    for tag, href in page.links:
        url = urlsplit(href)
        if url.scheme in ('https','http'):
            if url.hostname != 'eliseegkart.github.io': external.add(href); continue
        elif url.scheme or url.netloc: continue
        raw = unquote(url.path)
        if raw.startswith('/'):
            if base and not (raw == base or raw.startswith(base + '/')):
                errors.append(f'{path.relative_to(root)}: missing baseurl: {href}'); continue
            dest = root / raw[len(base):].lstrip('/')
        else: dest = path.parent / raw if raw else path
        if dest.is_dir(): dest /= 'index.html'
        dest = dest.resolve()
        if not dest.is_file(): errors.append(f'{path.relative_to(root)}: missing target {href}'); continue
        if url.fragment and tag != 'object' and dest in pages and unquote(url.fragment) not in pages[dest].ids:
            errors.append(f'{path.relative_to(root)}: missing fragment {href}')
        checked += 1
for route in ('index.html','research/index.html','publications/index.html','projects/index.html','honors/index.html','experience/index.html','cv/index.html','awards/index.html','resume/index.html','files/Hyeongjin_Kim_CV.pdf','Academic_CV/Academic_CV.pdf'):
    if not (root / route).is_file(): errors.append(f'Missing required route: {route}')
cv = pages.get((root/'cv/index.html').resolve())
if not cv or cv.objects != 1: errors.append('CV inline PDF object is missing')
if (root/'files/Hyeongjin_Kim_CV.pdf').exists() and (root/'Academic_CV/Academic_CV.pdf').exists():
    if (root/'files/Hyeongjin_Kim_CV.pdf').read_bytes() != (root/'Academic_CV/Academic_CV.pdf').read_bytes(): errors.append('Legacy CV differs from canonical CV')
for name in ('blog','teaching','talks','guide','single.html','Academic_CV/main.tex','Academic_CV/main_origin.tex','docs','scripts'):
    if (root/name).exists(): errors.append(f'Unexpected published content: {name}')
for p in pages:
    text = p.read_text()
    for pattern in ('Your Name','Red Brick University','example.org','3187 9925','Ph.D. Candidate'):
        if pattern in text: errors.append(f'{p.relative_to(root)}: stale/private text: {pattern}')
print(json.dumps({'html_pages':len(pages),'local_links_checked':checked,'external_urls':len(external),'errors':errors},indent=2))
sys.exit(bool(errors))
