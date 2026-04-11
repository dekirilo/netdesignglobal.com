/**
 * NetDesignGlobal — assets/js/main.js
 * Canvas network animation, scroll reveal, sticky nav,
 * mobile menu toggle, and contact form AJAX submission.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
   * 1. CANVAS NETWORK ANIMATION
   * ─────────────────────────────────────────── */
  (function initCanvas() {
    var canvas = document.getElementById('canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var W, H, nodes = [], RAF;

    function Node() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r  = Math.random() * 2 + 1;
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      nodes = [];
      var count = Math.min(Math.floor((W * H) / 11000), 90);
      for (var i = 0; i < count; i++) nodes.push(new Node());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var maxDist = 145;

      nodes.forEach(function (n) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.75)';
        ctx.fill();
      });

      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx   = nodes[i].x - nodes[j].x;
          var dy   = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            var alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = 'rgba(0,180,255,' + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      RAF = requestAnimationFrame(draw);
    }

    init();
    draw();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        cancelAnimationFrame(RAF);
        init();
        draw();
      }, 150);
    });
  })();


  /* ─────────────────────────────────────────────
   * 2. SCROLL REVEAL (IntersectionObserver)
   * ─────────────────────────────────────────── */
  (function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, i * 70);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    els.forEach(function (el) { observer.observe(el); });
  })();


  /* ─────────────────────────────────────────────
   * 3. STICKY NAV — add .scrolled class
   * ─────────────────────────────────────────── */
  (function initNav() {
    var nav = document.getElementById('ndg-nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  })();


  /* ─────────────────────────────────────────────
   * 4. MOBILE MENU TOGGLE
   * ─────────────────────────────────────────── */
  (function initMobileMenu() {
    var toggle = document.querySelector('.nav-mobile-toggle');
    var menu   = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Animate burger → X
      var spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close on nav link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        var spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });
  })();


  /* ─────────────────────────────────────────────
   * 5. SMOOTH SCROLL for anchor links
   * ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target   = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      var offset = 72; // nav height
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────────
   * 6. CONTACT FORM — toggle + AJAX submit
   * ─────────────────────────────────────────── */
  (function initContactForm() {
    var openBtn  = document.getElementById('open-contact-form');
    var formWrap = document.getElementById('contact-form-wrap');
    var form     = document.getElementById('ndg-contact-form');
    var btnText  = document.getElementById('cf-btn-text');
    var response = document.getElementById('cf-response');

    if (openBtn && formWrap) {
      openBtn.addEventListener('click', function () {
        var isVisible = formWrap.style.display !== 'none';
        formWrap.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
          // Smooth scroll to form
          setTimeout(function () {
            formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        }
      });
    }

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new FormData(form);
      data.append('action', 'ndg_contact');

      // Validate client-side
      var name    = form.querySelector('[name="name"]').value.trim();
      var email   = form.querySelector('[name="email"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showResponse('Please fill in all required fields.', true);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showResponse('Please enter a valid email address.', true);
        return;
      }

      // Disable button
      var submitBtn = form.querySelector('#cf-submit');
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending…';

      var ajaxUrl = (typeof ndgData !== 'undefined') ? ndgData.ajaxUrl : '/wp-admin/admin-ajax.php';

      fetch(ajaxUrl, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
      })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          showResponse(json.data.message || 'Message sent successfully!', false);
          form.reset();
        } else {
          showResponse(json.data.message || 'Something went wrong. Please try again.', true);
        }
      })
      .catch(function () {
        showResponse('Network error. Please email us directly at info@netdesignglobal.com', true);
      })
      .finally(function () {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
      });
    });

    function showResponse(msg, isError) {
      if (!response) return;
      response.textContent = msg;
      response.className = 'form-response' + (isError ? ' error' : '');
    }
  })();

})();
