const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 20);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const roleElement = document.querySelector('#typed-role');
const roles = ['web developer', 'Python learner', 'creative problem-solver'];
let roleIndex = 0;
let characterIndex = roles[0].length;
let deleting = true;

function typeRole() {
  const role = roles[roleIndex];
  roleElement.textContent = role.slice(0, characterIndex);

  if (deleting) {
    characterIndex -= 1;
    if (characterIndex < 1) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  } else {
    characterIndex += 1;
    if (characterIndex > roles[roleIndex].length) {
      deleting = true;
      setTimeout(typeRole, 1100);
      return;
    }
  }

  setTimeout(typeRole, deleting ? 55 : 90);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setTimeout(typeRole, 1200);
}

document.querySelector('#year').textContent = new Date().getFullYear();
// =========================================
// PERSONAL COMPASS — EXPAND / COLLAPSE
// =========================================

const compassToggle = document.getElementById("compass-toggle");
const personalCompass = document.getElementById("personal-compass");

if (compassToggle && personalCompass) {
  compassToggle.addEventListener("click", () => {
    const isOpen = personalCompass.classList.toggle("compass-open");

    compassToggle.setAttribute("aria-expanded", isOpen);

    const arrow = compassToggle.querySelector(".compass-toggle-arrow");

    if (arrow) {
      arrow.textContent = isOpen ? "↑" : "↓";
    }
  });
}