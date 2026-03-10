// Mobile hamburger menu toggle
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is clicked
navMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// Smooth scroll for #UX anchor
document.querySelector('a[href="#UX"]').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('UX').scrollIntoView({ behavior: 'smooth' });
});
