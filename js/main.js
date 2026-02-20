document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  var skills = document.querySelectorAll('.skill');
  if('IntersectionObserver' in window && skills.length){
    var obs = new IntersectionObserver(function(entries, observer){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          skills.forEach(function(s){
            var pct = s.getAttribute('data-percent') || '0';
            var fill = s.querySelector('.skill-fill');
            if(fill){
              fill.style.width = pct + '%';
            }
          });
          observer.disconnect();
        }
      });
    },{threshold:0.25});
    var aboutSection = document.querySelector('#about');
    if(aboutSection) obs.observe(aboutSection);
  } else {
    skills.forEach(function(s){
      var pct = s.getAttribute('data-percent') || '0';
      var fill = s.querySelector('.skill-fill');
      if(fill) fill.style.width = pct + '%';
    });
  }
  
  var typedEl = document.getElementById('typed');
  if(typedEl){
    var phrases = ['beautiful interfaces.', 'accessible experiences.', 'responsive websites.'];
    var current = 0; var idx = 0; var deleting = false;
    function tick(){
      var full = phrases[current];
      if(!deleting){
        idx++;
        typedEl.textContent = full.slice(0, idx);
        if(idx >= full.length){ deleting = true; setTimeout(tick, 900); return; }
      } else {
        idx--;
        typedEl.textContent = full.slice(0, idx);
        if(idx === 0){ deleting = false; current = (current+1) % phrases.length; }
      }
      setTimeout(tick, deleting ? 60 : 120);
    }
    tick();
  }

  // Contact form handling (client-side validation + simulated send)
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var form = e.target;
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      if(!name || !email || !message){
        formStatus.style.color = '#c62828';
        formStatus.textContent = 'Please fill all fields before sending.';
        return;
      }
      formStatus.style.color = 'var(--accent)';
      formStatus.textContent = 'Sending message...';
      // Simulate network send
      setTimeout(function(){
        formStatus.textContent = 'Message sent — I will get back to you soon!';
        form.reset();
      }, 900);
    });
  }
});
