(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  const dialog = document.querySelector('.image-dialog');
  let previousFocus;
  if (typeof dialog.showModal !== 'function') return;
  document.querySelectorAll('a[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    // Keep the ordinary link as a fallback and allow Ctrl/Cmd-click to open a new tab.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); previousFocus = link;
    const caption = link.dataset.caption || link.querySelector('img')?.alt || link.getAttribute('aria-label') || 'Image preview';
    const img = dialog.querySelector('img'); img.src = link.href; img.alt = caption;
    dialog.querySelector('#image-dialog-caption').textContent = caption;
    dialog.querySelector('.dialog-original').href = link.href;
    dialog.showModal(); document.body.classList.add('dialog-open');
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); previousFocus?.focus(); });
})();
