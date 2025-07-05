// Performance optimization: Use more efficient selectors and event delegation
document.addEventListener('DOMContentLoaded', function() {
  // Cache frequently used elements
  const elements = {
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navbar: document.querySelector('.navbar'),
    scrollToTopBtn: document.getElementById('scrollToTop'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    body: document.body,
    loadingScreen: document.getElementById('loadingScreen'),
    easterEggTrigger: document.getElementById('easter-egg-trigger'),
    easterEggSection: document.getElementById('easter-egg-section'),
    closeEasterEgg: document.getElementById('close-easter-egg'),
    randomMemeImg: document.getElementById('random-meme-img'),
    memeNumber: document.getElementById('meme-number'),
    sparkleContainer: document.getElementById('sparkle-container')
  };

  // Navbar functionality with event delegation
  elements.navToggle?.addEventListener('click', () => {
    elements.navMenu.classList.toggle('active');
    elements.navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      elements.navMenu.classList.remove('active');
      elements.navToggle.classList.remove('active');
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!elements.navToggle?.contains(e.target) && !elements.navMenu?.contains(e.target)) {
      elements.navMenu.classList.remove('active');
      elements.navToggle.classList.remove('active');
    }
  });

  // Optimized navbar scroll effect with throttling
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          elements.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
          elements.navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
          elements.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
          elements.navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to top functionality
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      elements.scrollToTopBtn.classList.add('show');
    } else {
      elements.scrollToTopBtn.classList.remove('show');
    }
  });

  elements.scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Optimized smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });

  // Typing effect with performance optimization
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
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Optimized intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe skill tags and cards with lazy loading
  const animateElements = document.querySelectorAll('.category p, .card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Optimized click effects for project cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card && !e.target.closest('.card-buttons')) {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    }
  });

  // Dynamic copyright year
  const copyrightElement = document.querySelector('footer p');
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = `© Copyright All Rights Reserved ${currentYear} | BuildWithPiyush`;
  }

  // Optimized loading screen
  window.addEventListener('load', () => {
    setTimeout(() => {
      elements.loadingScreen?.classList.add('fade-out');
      setTimeout(() => {
        if (elements.loadingScreen) {
          elements.loadingScreen.style.display = 'none';
        }
      }, 500);
    }, 1500); // Reduced from 2000ms for better UX
  });

  // Dark mode functionality with localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  elements.body.setAttribute('data-theme', currentTheme);

  // Update icon based on current theme
  if (currentTheme === 'dark') {
    elements.themeIcon.className = 'fas fa-sun';
  } else {
    elements.themeIcon.className = 'fas fa-moon';
  }

  elements.themeToggle?.addEventListener('click', () => {
    const currentTheme = elements.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    elements.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon with animation
    if (newTheme === 'dark') {
      elements.themeIcon.className = 'fas fa-sun';
    } else {
      elements.themeIcon.className = 'fas fa-moon';
    }
    
    // Add rotation animation
    elements.themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      elements.themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
  });

  // Enhanced skills animation with staggered effect
  const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
        
        // Add pulse effect when animation completes
        setTimeout(() => {
          bar.style.boxShadow = '0 0 20px rgba(39, 147, 155, 0.5)';
          setTimeout(() => {
            bar.style.boxShadow = '0 2px 8px rgba(39, 147, 155, 0.3)';
          }, 300);
        }, 2000);
      }, index * 100);
    });
  };

  // Contact form handling moved to index.html
  // Enhanced intersection observer for skills
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const skillsContainer = document.querySelector('.skills-container');
  if (skillsContainer) {
    skillsObserver.observe(skillsContainer);
  }

  // Random Meme Easter Egg Functionality
  let memeClickCount = 0;
  let memeCounter = 0;
  let lastShownMeme = '';
  let autoCloseTimeout;

  // Available memes in your memeimg folder
  const availableMemes = [
    'memeimg/meme1.jpeg',
    'memeimg/meme2.jpeg',
    'memeimg/meme3.jpeg',
    'memeimg/meme4.jpeg',
    'memeimg/meme5.jpeg',
    'memeimg/meme6.jpeg',
    'memeimg/meme7.jpeg',
    'memeimg/meme8.jpeg',
    'memeimg/meme9.jpeg',
    'memeimg/meme10.jpeg'
  ];

  // Single click detection for meme display
  elements.easterEggTrigger?.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Add visual feedback
    elements.easterEggTrigger.classList.add('clicked');
    setTimeout(() => {
      elements.easterEggTrigger.classList.remove('clicked');
    }, 300);
    
    // Show random meme
    showRandomMeme();
  });

  // Show random meme with animation
  function showRandomMeme() {
    // Get random meme (avoid immediate repeats)
    let randomMeme;
    do {
      randomMeme = availableMemes[Math.floor(Math.random() * availableMemes.length)];
    } while (randomMeme === lastShownMeme && availableMemes.length > 1);
    
    lastShownMeme = randomMeme;
    memeCounter++;
    
    // Update meme counter
    elements.memeNumber.textContent = memeCounter;
    
    // Set the meme image with error handling
    elements.randomMemeImg.src = randomMeme;
    elements.randomMemeImg.onerror = function() {
      // Fallback to online meme if local file not found
      this.src = 'https://i.imgflip.com/2zo1ki.jpg';
    };
    
    // Show Easter egg modal
    elements.easterEggSection.classList.remove('easter-egg-hidden');
    elements.easterEggSection.classList.add('easter-egg-visible');
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add sparkle effects
    createSparkles();
    
    // Play pop sound effect (visual animation)
    elements.randomMemeImg.style.animation = 'none';
    setTimeout(() => {
      elements.randomMemeImg.style.animation = 'memeZoomIn 0.8s ease, popSound 0.3s ease 0.5s';
    }, 10);
    
    // Add celebration effect
    confetti();
    
    // Auto-close after 5 seconds
    clearTimeout(autoCloseTimeout);
    autoCloseTimeout = setTimeout(() => {
      hideEasterEgg();
    }, 5000);
  }

  // Hide Easter egg
  function hideEasterEgg() {
    elements.easterEggSection.classList.remove('easter-egg-visible');
    elements.easterEggSection.classList.add('easter-egg-hidden');
    
    // Restore scrolling
    document.body.style.overflow = '';
    
    // Clear auto-close timeout
    clearTimeout(autoCloseTimeout);
    
    // Clear sparkles
    elements.sparkleContainer.innerHTML = '';
  }

  // Create sparkle effects around meme
  function createSparkles() {
    elements.sparkleContainer.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        elements.sparkleContainer.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 2000);
      }, i * 100);
    }
  }

  // Close button functionality
  elements.closeEasterEgg?.addEventListener('click', hideEasterEgg);

  // Close Easter egg when clicking outside
  elements.easterEggSection?.addEventListener('click', (e) => {
    if (e.target === elements.easterEggSection) {
      hideEasterEgg();
    }
  });

  // Close Easter egg with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.easterEggSection.classList.contains('easter-egg-visible')) {
      hideEasterEgg();
    }
  });

  // Confetti animation
  function confetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
      }, i * 20);
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
    
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 3000);
  }

  // Add confetti fall animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.skill-row').forEach(row => {
    row.addEventListener('click', function() {
      this.querySelector('.skill-tooltip').style.display = 'block';
    });
    row.addEventListener('mouseleave', function() {
      this.querySelector('.skill-tooltip').style.display = 'none';
    });
  });
});
