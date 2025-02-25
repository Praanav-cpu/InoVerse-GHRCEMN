// Enhanced smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      
       
      const startPosition = window.pageYOffset;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;
      
      window.requestAnimationFrame(step);
      
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
         
        const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * easing(percentage));
        
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
    });
  });
  
  
  function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach((element, index) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        setTimeout(() => {
          element.classList.add('active');
        }, index * 100); // Stagger effect
      }
    });
  }
  
  window.addEventListener('scroll', reveal);
  reveal(); // Initial check
  
  // Enhanced navbar scroll effect with transparency
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
    
    // Update navbar transparency based on scroll position
    const scrollPercentage = Math.min(currentScroll / 500, 1);
    const backgroundColor = `rgba(26, 26, 26, ${0.9 + (scrollPercentage * 0.1)})`;
    
    if (currentScroll <= 0) {
      navbar.style.background = 'rgba(26, 26, 26, 0.9)';
      navbar.style.transform = 'translateY(0)';
    } else if (scrollDirection === 'down' && currentScroll > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
      navbar.style.background = backgroundColor;
    }
    
    lastScroll = currentScroll;
    
    // Update active section in navbar
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        const id = section.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Enhanced form submission with validation and animation
  const form = document.querySelector('.register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Validate form
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#ff4444';
        shake(input);
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (!isValid) return;
    
    // Animate button
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success animation
    submitBtn.textContent = 'Success!';
    submitBtn.style.background = 'linear-gradient(to right, #34d399, #3b82f6)';
    
    // Reset form
    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      
      // Show success message
      const message = document.createElement('div');
      message.textContent = 'Thank you for registering! We will contact you soon.';
      message.style.color = '#34d399';
      message.style.textAlign = 'center';
      message.style.marginTop = '1rem';
      message.style.opacity = '0';
      form.appendChild(message);
      
      // Fade in message
      requestAnimationFrame(() => {
        message.style.transition = 'opacity 0.3s ease';
        message.style.opacity = '1';
      });
      
      // Remove message after 5 seconds
      setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
      }, 5000);
    }, 2000);
  });
  
  // Shake animation for invalid inputs
  function shake(element) {
    element.style.animation = 'none';
    requestAnimationFrame(() => {
      element.style.animation = 'shake 0.5s ease';
    });
  }
  
  // Enhanced parallax effect for hero shapes
  document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    shapes.forEach((shape, index) => {
      const speed = index === 0 ? 20 : index === 1 ? 30 : 15;
      const x = (mouseX - centerX) / speed;
      const y = (mouseY - centerY) / speed;
      
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  // Add custom cursor effect
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  let cursorTimeout;
  document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
      cursor.style.opacity = '0';
    }, 2000);
  });
  
  // Add intersection observer for better scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });