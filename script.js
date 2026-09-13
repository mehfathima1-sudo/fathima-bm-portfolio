const menuButton = document.querySelector('.menu-button');
// =========================================
// PHASE 1 — CINEMATIC INTRO CONTROLLER
// Portal → Signature → Home
// =========================================

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const portalPreintro =
  document.getElementById('portalPreintro');

const signatureIntro =
  document.getElementById('signatureIntro');

if (!prefersReducedMotion) {

  // Keep home hidden while intro is running
  document.body.classList.add('intro-running');


  // Portal is completing here.
  // Start the Fathima B M signature scene.
  setTimeout(() => {

    if (signatureIntro) {
      signatureIntro.classList.add('signature-active');
    }

  }, 1950);


  // Begin revealing the real portfolio
  setTimeout(() => {

    document.body.classList.add('intro-complete');

  }, 3950);


  // Completely remove intro elements after animation
  setTimeout(() => {

    if (portalPreintro) {
      portalPreintro.style.display = 'none';
    }

    if (signatureIntro) {
      signatureIntro.style.display = 'none';
    }

  }, 4650);

} else {

  document.body.classList.add('intro-complete');

}
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
const roles = ['web developer', 'BCA student', 'creative problem-solver'];
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

if (!prefersReducedMotion) {
  setTimeout(typeRole, 4550);
} else {
  roleElement.textContent = roles[0];
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
// =========================================
// PHASE 1.5 — HERO INTERACTION
// =========================================

const heroSection = document.querySelector('.hero');
const heroPortrait = document.querySelector('.portrait-frame');
const heroPortraitCard = document.querySelector('.portrait-card');


// -----------------------------------------
// CREATE SCROLL INDICATOR
// -----------------------------------------

if (heroSection && !document.querySelector('.hero-scroll-cue')) {

  const scrollCue = document.createElement('a');

  scrollCue.className = 'hero-scroll-cue';

  scrollCue.href = '#about';

  scrollCue.setAttribute(
    'aria-label',
    'Scroll to About section'
  );

  scrollCue.innerHTML = `
    <span></span>
    <small>SCROLL</small>
  `;

  heroSection.appendChild(scrollCue);

}


// -----------------------------------------
// SUBTLE PORTRAIT PARALLAX
// -----------------------------------------

if (
  heroSection &&
  heroPortrait &&
  !prefersReducedMotion
) {

  heroSection.addEventListener(
    'pointermove',
    (event) => {

      const rect =
        heroSection.getBoundingClientRect();

      const mouseX =
        (event.clientX - rect.left)
        / rect.width;

      const mouseY =
        (event.clientY - rect.top)
        / rect.height;


      // Range -1 → +1

      const x =
        (mouseX - 0.5) * 2;

      const y =
        (mouseY - 0.5) * 2;


      heroPortrait.style.setProperty(
        '--portrait-x',
        `${x * 8}px`
      );

      heroPortrait.style.setProperty(
        '--portrait-y',
        `${y * 6}px`
      );


      if (heroPortraitCard) {

        heroPortraitCard.style.setProperty(
          '--card-x',
          `${x * 13}px`
        );

        heroPortraitCard.style.setProperty(
          '--card-y',
          `${y * 9}px`
        );

      }

    }
  );


  heroSection.addEventListener(
    'pointerleave',
    () => {

      heroPortrait.style.setProperty(
        '--portrait-x',
        '0px'
      );

      heroPortrait.style.setProperty(
        '--portrait-y',
        '0px'
      );


      if (heroPortraitCard) {

        heroPortraitCard.style.setProperty(
          '--card-x',
          '0px'
        );

        heroPortraitCard.style.setProperty(
          '--card-y',
          '0px'
        );

      }

    }
  );

}
// =========================================
// PHASE 2 — SCROLL-DRIVEN EDUCATION JOURNEY
// =========================================

const educationJourney =
  document.querySelector('.education-journey');

const journeyItems =
  document.querySelectorAll('.journey-item');

const journeyTransitions =
  document.querySelectorAll(
    '.journey-change, .journey-decision'
  );


// -----------------------------------------
// ACTIVATE EACH EDUCATION STAGE
// -----------------------------------------

if (
  journeyItems.length &&
  !prefersReducedMotion
) {

  const journeyObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'journey-active'
            );

            journeyObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.28,

        rootMargin:
          '0px 0px -10% 0px'
      }
    );


  journeyItems.forEach((item) => {

    journeyObserver.observe(item);

  });

}


// -----------------------------------------
// ACTIVATE TRANSITION MOMENTS
// Malayalam → Kannada
// Kannada → English
// Commerce → BCA
// -----------------------------------------

if (
  journeyTransitions.length &&
  !prefersReducedMotion
) {

  const transitionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'journey-transition-active'
            );

            transitionObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.35
      }
    );


  journeyTransitions.forEach(
    (transition) => {

      transitionObserver.observe(
        transition
      );

    }
  );

}


// -----------------------------------------
// DRAW TIMELINE ACCORDING TO SCROLL
// -----------------------------------------

function updateJourneyProgress() {

  if (
    !educationJourney ||
    prefersReducedMotion
  ) {
    return;
  }


  const rect =
    educationJourney.getBoundingClientRect();


  const viewportHeight =
    window.innerHeight;


  /*
     Start drawing when timeline enters
     lower part of screen.

     Finish around when timeline passes
     through upper part.
  */

  const startPoint =
    viewportHeight * 0.78;


  const totalDistance =
    rect.height +
    viewportHeight * 0.45;


  const travelled =
    startPoint -
    rect.top;


  let progress =
    travelled /
    totalDistance;


  progress =
    Math.max(
      0,
      Math.min(1, progress)
    );


  educationJourney.style.setProperty(
    '--journey-progress',
    progress.toFixed(3)
  );

}


// Initial position

updateJourneyProgress();


// Use requestAnimationFrame
// so scrolling stays smooth

let journeyTicking = false;


window.addEventListener(
  'scroll',
  () => {

    if (!journeyTicking) {

      window.requestAnimationFrame(
        () => {

          updateJourneyProgress();

          journeyTicking = false;

        }
      );

      journeyTicking = true;

    }

  },

  {
    passive: true
  }
);


window.addEventListener(
  'resize',
  updateJourneyProgress
);
// =========================================
// PHASE 3 — TRAINING + EXPERIENCE
// =========================================

const phase3Cards =
  document.querySelectorAll(
    '.training-card, .internship-card'
  );

if (
  phase3Cards.length &&
  !prefersReducedMotion
) {

  const phase3Observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'phase3-active'
            );

            phase3Observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.22,
        rootMargin:
          '0px 0px -8% 0px'
      }
    );

  phase3Cards.forEach((card) => {

    phase3Observer.observe(card);

  });

}
// =========================================
// PHASE 4 — FEATURED PROJECT
// =========================================

const featuredProject =
  document.querySelector('.project-card');


// -----------------------------------------
// REVEAL PROJECT
// -----------------------------------------

if (
  featuredProject &&
  !prefersReducedMotion
) {

  const projectObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'phase4-active'
            );

            projectObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.28,
        rootMargin:
          '0px 0px -8% 0px'
      }
    );


  projectObserver.observe(
    featuredProject
  );

}


// -----------------------------------------
// SUBTLE PROJECT TILT
// -----------------------------------------

if (
  featuredProject &&
  !prefersReducedMotion &&
  window.matchMedia(
    '(hover: hover)'
  ).matches
) {

  featuredProject.addEventListener(
    'pointermove',
    (event) => {

      const rect =
        featuredProject
          .getBoundingClientRect();


      const x =
        (event.clientX - rect.left)
        / rect.width;


      const y =
        (event.clientY - rect.top)
        / rect.height;


      const rotateY =
        (x - 0.5) * 2.4;


      const rotateX =
        (0.5 - y) * 1.8;


      featuredProject.style.transform =
        `
        perspective(1100px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-2px)
        `;

    }
  );


  featuredProject.addEventListener(
    'pointerleave',
    () => {

      featuredProject.style.transform =
        `
        perspective(1100px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        `;

    }
  );

}
// =========================================
// PHASE 5 — SKILLS + BEYOND THE CODE
// =========================================

const skillCards =
  document.querySelectorAll(
    '.skills-grid .skill-card'
  );

const beyondSkills =
  document.querySelector(
    '.beyond-skills'
  );


// -----------------------------------------
// SKILL CARDS
// -----------------------------------------

if (
  skillCards.length &&
  !prefersReducedMotion
) {

  const skillObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'phase5-active'
            );

            skillObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.25,
        rootMargin:
          '0px 0px -8% 0px'
      }
    );


  skillCards.forEach((card) => {

    skillObserver.observe(card);

  });

}


// -----------------------------------------
// BEYOND THE CODE
// -----------------------------------------

if (
  beyondSkills &&
  !prefersReducedMotion
) {

  const beyondObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'phase5-beyond-active'
            );

            beyondObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.18,
        rootMargin:
          '0px 0px -6% 0px'
      }
    );


  beyondObserver.observe(
    beyondSkills
  );

}
// =========================================
// PHASE 6 — RESUME + CONTACT + FOOTER
// =========================================

const resumeSection =
  document.querySelector(
    '.resume-section'
  );

const contactSection =
  document.querySelector(
    '.contact-section'
  );

const pageFooter =
  document.querySelector(
    'footer'
  );


// -----------------------------------------
// RESUME
// -----------------------------------------

if (
  resumeSection &&
  !prefersReducedMotion
) {

  const resumeObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'phase6-active'
            );

            resumeObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.25
      }
    );


  resumeObserver.observe(
    resumeSection
  );

}


// -----------------------------------------
// CONTACT
// -----------------------------------------

if (
  contactSection &&
  !prefersReducedMotion
) {

  const contactObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'phase6-active'
            );

            contactObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.22
      }
    );


  contactObserver.observe(
    contactSection
  );

}


// -----------------------------------------
// FOOTER
// -----------------------------------------

if (
  pageFooter &&
  !prefersReducedMotion
) {

  const footerObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'phase6-footer-active'
            );

            footerObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.45
      }
    );


  footerObserver.observe(
    pageFooter
  );

}
// =========================================
// PHASE 7 — FINAL UI POLISH
// Scroll progress + active navigation
// =========================================


// -----------------------------------------
// CREATE PAGE PROGRESS BAR
// -----------------------------------------

const pageProgress =
  document.createElement('div');

pageProgress.className =
  'page-progress';

pageProgress.setAttribute(
  'aria-hidden',
  'true'
);

pageProgress.innerHTML =
  '<div class="page-progress-bar"></div>';

document.body.appendChild(
  pageProgress
);

const progressBar =
  document.querySelector(
    '.page-progress-bar'
  );


// -----------------------------------------
// UPDATE PAGE PROGRESS
// -----------------------------------------

function updatePageProgress() {

  if (!progressBar) {
    return;
  }


  const scrollTop =
    window.scrollY;


  const scrollableHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const progress =
    scrollableHeight > 0
      ? scrollTop / scrollableHeight
      : 0;


  progressBar.style.transform =
    `scaleX(${Math.min(
      1,
      Math.max(0, progress)
    )})`;

}


updatePageProgress();

window.addEventListener(
  'scroll',
  updatePageProgress,
  {
    passive: true
  }
);

window.addEventListener(
  'resize',
  updatePageProgress
);


// =========================================
// ACTIVE NAVIGATION
// =========================================

const portfolioSections =
  document.querySelectorAll(
    'main section[id]'
  );

const portfolioNavLinks =
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );


function updateActiveNavigation() {

  let currentSection =
    'home';


  const scrollPosition =
    window.scrollY + 180;


  portfolioSections.forEach(
    (section) => {

      if (
        section.offsetTop <=
        scrollPosition
      ) {

        currentSection =
          section.id;

      }

    }
  );


  portfolioNavLinks.forEach(
    (link) => {

      const sectionId =
        link
          .getAttribute('href')
          .replace('#', '');


      link.classList.toggle(
        'nav-active',
        sectionId === currentSection
      );

    }
  );

}


updateActiveNavigation();


window.addEventListener(
  'scroll',
  updateActiveNavigation,
  {
    passive: true
  }
);