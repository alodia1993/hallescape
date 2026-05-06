// ── Menu hamburguesa ──
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !nav.contains(e.target)) closeMenu();
});

function closeMenu() {
  nav.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}

