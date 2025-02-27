// Mobile Navigation
function showMenu() {
    document.getElementById("navLinks").style.right = "0";
  }
  
  function hideMenu() {
    document.getElementById("navLinks").style.right = "-200px";
  }
  
  // GSAP Animations
  document.addEventListener("DOMContentLoaded", function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  
    // Reveal animations for cards and text
    const revealCards = document.querySelectorAll('.reveal-card');
    revealCards.forEach(card => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => card.classList.add('active'),
        once: true
      });
    });
  
    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach(text => {
      ScrollTrigger.create({
        trigger: text,
        start: "top 85%",
        onEnter: () => text.classList.add('active'),
        once: true
      });
    });
  
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      
      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        onEnter: () => {
          let count = 0;
          const duration = 2000; // 2 seconds
          const interval = 50; // Update every 50ms
          const increment = Math.ceil(target / (duration / interval));
          
          const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(counter);
            }
            stat.textContent = count;
          }, interval);
        },
        once: true
      });
    });
  
    // FAQ toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  
    // Schedule tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  
    // Registration form team name toggle
    const teamStatus = document.getElementById('teamStatus');
    if (teamStatus) {
      teamStatus.addEventListener('change', function() {
        const teamNameGroup = document.querySelector('.team-name-group');
        if (this.value === 'team') {
          teamNameGroup.classList.remove('hidden');
        } else {
          teamNameGroup.classList.add('hidden');
        }
      });
    }
  
    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
      registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
          } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }
        });
        
        if (isValid) {
          // Hide form and show success message
          registrationForm.style.display = 'none';
          document.getElementById('registrationSuccess').classList.remove('hidden');
          
          // In a real application, you would send the form data to a server here
          console.log('Form submitted successfully');
        }
      });
    }
  });