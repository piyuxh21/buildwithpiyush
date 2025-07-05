// script.js - Clean, modern, and efficient portfolio interactivity

document.addEventListener('DOMContentLoaded', function() {
  // --- NAVBAR ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.querySelector('.navbar');
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Hamburger menu toggle (mobile)
  navToggle?.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    }
  });
  // Close menu on link click (mobile)
  navMenu?.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && e.target.classList.contains('nav-link')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
  // Close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (
      window.innerWidth <= 768 &&
      !navToggle.contains(e.target) &&
      !navMenu.contains(e.target)
    ) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // --- MOBILE NAVBAR TOGGLE ONLY ---
  document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Hamburger menu toggle (mobile only)
    navToggle?.addEventListener('click', function(e) {
      if (window.innerWidth <= 900) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      }
    });

    // Close menu on nav link click (mobile only)
    navMenu?.addEventListener('click', function(e) {
      if (window.innerWidth <= 900 && e.target.classList.contains('nav-link')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });

    // Optional: Close menu when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
      if (
        window.innerWidth <= 900 &&
        !navToggle.contains(e.target) &&
        !navMenu.contains(e.target)
      ) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  });

  // Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255,255,255,0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
      navbar.style.background = 'rgba(255,255,255,0.95)';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
    // Show/hide scroll to top
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- THEME TOGGLE ---
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  themeToggle?.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => { themeToggle.style.transform = 'rotate(0deg)'; }, 300);
  });

  // --- SMOOTH ANCHOR SCROLL & ACTIVE NAVIGATION ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
  
  // Update active navigation based on scroll position
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', updateActiveNav);
  // Initial call to set active state
  updateActiveNav();

  // --- HERO TYPING EFFECT ---
  const heroText = document.querySelector('.hero-left h1:first-child span');
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // --- LOADING SCREEN ---
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Show loading screen immediately
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }
  
  // Hide loading screen when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen?.classList.add('fade-out');
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.display = 'none';
          // Enable smooth scrolling after loading
          document.documentElement.style.scrollBehavior = 'smooth';
        }
      }, 500);
    }, 800);
  });
  
  // Fallback: Hide loading screen after 3 seconds if load event doesn't fire
  setTimeout(() => {
    if (loadingScreen && loadingScreen.style.display !== 'none') {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        if (loadingScreen) loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 3000);

  // --- EASTER EGG: RANDOM MEME ---
  const easterEggTrigger = document.getElementById('easter-egg-trigger');
  const easterEggSection = document.getElementById('easter-egg-section');
  const closeEasterEgg = document.getElementById('close-easter-egg');
  const randomMemeImg = document.getElementById('random-meme-img');
  const memeNumber = document.getElementById('meme-number');
  const sparkleContainer = document.getElementById('sparkle-container');
  let memeCounter = 0, lastMeme = '', autoCloseTimeout;
  const memes = [
    'memeimg/meme1.jpeg','memeimg/meme2.jpeg','memeimg/meme3.jpeg','memeimg/meme4.jpeg','memeimg/meme5.jpeg',
    'memeimg/meme6.jpeg','memeimg/meme7.jpeg','memeimg/meme8.jpeg','memeimg/meme9.jpeg','memeimg/meme10.jpeg'
  ];
  easterEggTrigger?.addEventListener('click', (e) => {
    e.preventDefault();
    showRandomMeme();
  });
  function showRandomMeme() {
    let meme;
    do { meme = memes[Math.floor(Math.random()*memes.length)]; } while (meme === lastMeme && memes.length > 1);
    lastMeme = meme;
    memeCounter++;
    memeNumber.textContent = memeCounter;
    randomMemeImg.src = meme;
    randomMemeImg.onerror = function() { this.src = 'https://i.imgflip.com/2zo1ki.jpg'; };
    easterEggSection.classList.remove('easter-egg-hidden');
    easterEggSection.classList.add('easter-egg-visible');
    document.body.style.overflow = 'hidden';
    createSparkles();
    randomMemeImg.style.animation = 'none';
    setTimeout(() => {
      randomMemeImg.style.animation = 'memeZoomIn 0.8s ease, popSound 0.3s ease 0.5s';
    }, 10);
    confetti();
    clearTimeout(autoCloseTimeout);
    autoCloseTimeout = setTimeout(hideEasterEgg, 5000);
  }
  function hideEasterEgg() {
    easterEggSection.classList.remove('easter-egg-visible');
    easterEggSection.classList.add('easter-egg-hidden');
    document.body.style.overflow = '';
    clearTimeout(autoCloseTimeout);
    sparkleContainer.innerHTML = '';
  }
  function createSparkles() {
    sparkleContainer.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkleContainer.appendChild(sparkle);
        setTimeout(() => { sparkle.remove(); }, 2000);
      }, i * 100);
    }
  }
  closeEasterEgg?.addEventListener('click', hideEasterEgg);
  easterEggSection?.addEventListener('click', (e) => {
    if (e.target === easterEggSection) hideEasterEgg();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && easterEggSection.classList.contains('easter-egg-visible')) hideEasterEgg();
  });
  function confetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createConfettiPiece(colors[Math.floor(Math.random()*colors.length)]), i * 20);
    }
  }
  function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = 'confettiFall 3s linear forwards';
    document.body.appendChild(confetti);
    setTimeout(() => { confetti.remove(); }, 3000);
  }
  // Add confetti animation CSS if not present
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `@keyframes confettiFall {0%{transform:translateY(-10px) rotate(0deg);opacity:1;}100%{transform:translateY(100vh) rotate(720deg);opacity:0;}}`;
    document.head.appendChild(style);
  }

  // --- ANIMATE SKILLS ON SCROLL ---
  const skillBars = document.querySelectorAll('.skill-progress');
  if (skillBars.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = bar.getAttribute('data-progress') || bar.style.width.replace('%','');
          bar.style.width = progress + '%';
          bar.style.boxShadow = '0 0 20px rgba(39, 147, 155, 0.5)';
          setTimeout(() => {
            bar.style.boxShadow = '0 2px 8px rgba(39, 147, 155, 0.3)';
          }, 300);
          obs.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => {
      bar.style.width = '0%';
      observer.observe(bar);
    });
  }

  // --- CARD CLICK EFFECT ---
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card && !e.target.closest('.card-buttons')) {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => { card.style.transform = ''; }, 150);
    }
  });
});
