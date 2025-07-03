
// Navbar functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  }
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Add typing effect to hero text
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

// Add animation to skills on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe skill tags
document.querySelectorAll('.category p').forEach(skill => {
  skill.style.opacity = '0';
  skill.style.transform = 'translateY(20px)';
  skill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(skill);
});

// Observe cards
document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(card);
});

// Add click effect to project cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Only trigger if not clicking on buttons
    if (!e.target.closest('.card-buttons')) {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }
  });
});

// Add dynamic copyright year
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('footer p');
if (copyrightElement) {
  copyrightElement.textContent = `© Copyright All Rights Reserved ${currentYear}`;
}

// Loading screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 2000);
});

// Dark mode functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
if (currentTheme === 'dark') {
  themeIcon.className = 'fas fa-sun';
} else {
  themeIcon.className = 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  if (newTheme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
  
  // Add a subtle animation
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)';
  }, 300);
});

// Enhanced skills animation with staggered effect
const animateSkills = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress + '%';
      
      // Add a pulse effect when animation completes
      setTimeout(() => {
        bar.style.boxShadow = '0 0 20px rgba(39, 147, 155, 0.5)';
        setTimeout(() => {
          bar.style.boxShadow = '0 2px 8px rgba(39, 147, 155, 0.3)';
        }, 300);
      }, 2000);
    }, index * 100);
  });
};

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Basic validation
  if (name.length < 2) {
    alert('Name must be at least 2 characters long');
    return;
  }
  
  if (!email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }
  
  if (message.length < 10) {
    alert('Message must be at least 10 characters long');
    return;
  }
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

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
const easterEggTrigger = document.getElementById('easter-egg-trigger');
const easterEggSection = document.getElementById('easter-egg-section');
const closeEasterEgg = document.getElementById('close-easter-egg');
const randomMemeImg = document.getElementById('random-meme-img');
const memeNumber = document.getElementById('meme-number');
const sparkleContainer = document.getElementById('sparkle-container');

// Available memes in your memeimg folder
// const availableMemes = [
//   'memeimg/meme1.jpg',
//   'memeimg/meme2.png',
//   'memeimg/meme3.jpg',
//   'memeimg/meme4.png',
//   'memeimg/meme5.jpg',
//   'memeimg/meme6.png',
//   'memeimg/meme7.jpg',
//   'memeimg/meme8.png',
//   'memeimg/meme9.jpg',
//   'memeimg/meme10.png'
// ];
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
easterEggTrigger.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Add visual feedback
  easterEggTrigger.classList.add('clicked');
  setTimeout(() => {
    easterEggTrigger.classList.remove('clicked');
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
  memeNumber.textContent = memeCounter;
  
  // Set the meme image with error handling
  randomMemeImg.src = `${randomMeme}?t=${Date.now()}`;
  randomMemeImg.onerror = function() {
    // Fallback to online meme if local file not found
    this.src = 'https://i.imgflip.com/2zo1ki.jpg';
  };
  
  // Show Easter egg modal
  easterEggSection.classList.remove('easter-egg-hidden');
  easterEggSection.classList.add('easter-egg-visible');
  
  // Prevent scrolling when modal is open
  document.body.style.overflow = 'hidden';
  
  // Add sparkle effects
  createSparkles();
  
  // Play pop sound effect (visual animation)
  randomMemeImg.style.animation = 'none';
  setTimeout(() => {
    randomMemeImg.style.animation = 'memeZoomIn 0.8s ease, popSound 0.3s ease 0.5s';
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
  easterEggSection.classList.remove('easter-egg-visible');
  easterEggSection.classList.add('easter-egg-hidden');
  
  // Restore scrolling
  document.body.style.overflow = '';
  
  // Clear auto-close timeout
  clearTimeout(autoCloseTimeout);
  
  // Clear sparkles
  sparkleContainer.innerHTML = '';
}

// Create sparkle effects around meme
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
closeEasterEgg.addEventListener('click', hideEasterEgg);

// Close on backdrop click
easterEggSection.addEventListener('click', (e) => {
  if (e.target === easterEggSection) {
    hideEasterEgg();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && easterEggSection.classList.contains('easter-egg-visible')) {
    hideEasterEgg();
  }
});

// Simple confetti effect
function confetti() {
  const colors = ['#27939b', '#62d5dd', '#f39c12', '#e74c3c', '#9b59b6'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }, i * 20);
  }
}

function createConfettiPiece(color) {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '8px';
  confetti.style.height = '8px';
  confetti.style.backgroundColor = color;
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-10px';
  confetti.style.borderRadius = '50%';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = '10000';
  confetti.style.animation = 'confettiFall 3s ease-out forwards';
  
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0% {
      transform: translateY(-10px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

// Parallax effect removed for better performance

// Particle animation removed for better performance

// Add smooth reveal animations
const revealElements = document.querySelectorAll('.card, .skill-item, .hero-left, .hero-right');
revealElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
