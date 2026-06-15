const typedPhrases = [
  'AI & Data Science Student',
  'Future Software Engineer',
  'Tech Enthusiast'
];
const typedElement = document.getElementById('typedText');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const body = document.documentElement;

let typeIndex = 0;
let charIndex = 0;
let direction = 1;
let isDeleting = false;

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (body.classList.contains('dark-theme')) {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

function setTheme(theme) {
  if (theme === 'light') {
    body.classList.remove('dark-theme');
  } else {
    body.classList.add('dark-theme');
  }
  localStorage.setItem('portfolioTheme', theme);
  updateThemeIcon();
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('dark');
  }
}

function toggleTheme() {
  if (body.classList.contains('dark-theme')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

function typeLoop() {
  const currentPhrase = typedPhrases[typeIndex];
  if (isDeleting) {
    charIndex -= 1;
    typedElement.textContent = currentPhrase.substring(0, charIndex);
    if (charIndex <= 0) {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % typedPhrases.length;
      setTimeout(typeLoop, 250);
      return;
    }
  } else {
    charIndex += 1;
    typedElement.textContent = currentPhrase.substring(0, charIndex);
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  }
  const delay = isDeleting ? 70 : 100;
  setTimeout(typeLoop, delay);
}

function handleReveal(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      if (target.classList.contains('reveal-group')) {
        target.classList.add('active');
        observer.unobserve(target);
      } else {
        target.classList.add('active');
        observer.unobserve(target);
      }
    }
  });
}

function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.15,
  };

  const observer = new IntersectionObserver(handleReveal, observerOptions);
  document.querySelectorAll('.reveal, .reveal-group').forEach((element) => {
    observer.observe(element);
  });
}

function initMenuToggle() {
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
    });
  });
}

function init() {
  loadSavedTheme();
  updateThemeIcon();
  themeToggle.addEventListener('click', toggleTheme);
  initMenuToggle();
  initRevealAnimations();
  typeLoop();
}

window.addEventListener('DOMContentLoaded', init);
