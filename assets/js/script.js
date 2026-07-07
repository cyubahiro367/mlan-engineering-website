/* =========================================================
   MLAN ENGINEERING — Site interactions
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Theme (dark / light) ---------- */
  var root = document.documentElement;
  var themeKey = 'mlan-theme';

  function getPreferredTheme(){
    var stored = localStorage.getItem(themeKey);
    if(stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme){
    root.classList.toggle('dark', theme === 'dark');
    document.querySelectorAll('[data-theme-label]').forEach(function(el){
      el.textContent = theme === 'dark' ? 'Dark' : 'Light';
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(function(btn){
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
    localStorage.setItem(themeKey, theme);
  }

  applyTheme(getPreferredTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var isDark = root.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if(navToggle && mobileMenu){
    navToggle.addEventListener('click', function(){
      var open = mobileMenu.classList.toggle('flex');
      mobileMenu.classList.toggle('hidden');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader(){
    if(!header) return;
    if(window.scrollY > 12){ header.classList.add('shadow-lg'); }
    else{ header.classList.remove('shadow-lg'); }
  }
  document.addEventListener('scroll', onScrollHeader, { passive:true });
  onScrollHeader();

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  function onScrollSpy(){
    var pos = window.scrollY + 120;
    var current = sections[0] && sections[0].id;
    sections.forEach(function(sec){
      if(pos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(function(link){
      var match = link.getAttribute('href') === '#' + current;
      link.classList.toggle('text-[var(--gold)]', match);
    });
  }
  document.addEventListener('scroll', onScrollSpy, { passive:true });
  onScrollSpy();

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');
  if(backToTop){
    document.addEventListener('scroll', function(){
      backToTop.classList.toggle('show', window.scrollY > 700);
    }, { passive:true });
    backToTop.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- Hero blueprint -> photo resolve ---------- */
  window.addEventListener('DOMContentLoaded', function(){
    var photo = document.querySelector('.hero-photo');
    var wire = document.querySelector('.hero-wireframe');
    setTimeout(function(){
      if(photo) photo.classList.add('is-resolved');
      if(wire) wire.classList.add('is-hidden');
    }, 260);
  });

  /* ---------- Count-up stats ---------- */
  function countUp(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(target * eased);
      el.textContent = value + suffix;
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window && counters.length){
    var ioCount = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          countUp(entry.target);
          ioCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function(c){ ioCount.observe(c); });
  }

  /* ---------- Project filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('[data-category]');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function(b){ b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      galleryItems.forEach(function(item){
        var cat = item.getAttribute('data-category');
        var show = filter === 'all' || cat === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Accordion (services detail) ---------- */
  document.querySelectorAll('.acc-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if(panel){ panel.classList.toggle('is-open', !expanded); }
    });
  });

  /* ---------- Lightbox for gallery ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  document.querySelectorAll('[data-lightbox]').forEach(function(trigger){
    trigger.addEventListener('click', function(){
      var img = trigger.querySelector('img');
      if(!img || !lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if(lightboxCaption) lightboxCaption.textContent = img.alt;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }
  if(lightbox){
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox || e.target.hasAttribute('data-close-lightbox')) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- Contact form (client-side only -> mailto) ---------- */
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var service = form.service.value;
      var message = form.message.value.trim();
      var status = document.getElementById('formStatus');

      if(!name || !email || !message){
        if(status){
          status.textContent = 'Please fill in your name, email, and message before sending.';
          status.className = 'text-sm mt-3 text-red-500';
        }
        return;
      }

      var subject = encodeURIComponent('Project enquiry — ' + (service || 'General') + ' — ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Service of interest: ' + (service || 'Not specified') + '\n\n' +
        'Message:\n' + message
      );
      window.location.href = 'mailto:mlanengineeringltd@gmail.com?subject=' + subject + '&body=' + body;

      if(status){
        status.textContent = 'Your email app should now open with this message ready to send.';
        status.className = 'text-sm mt-3 text-[var(--gold-deep)]';
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
