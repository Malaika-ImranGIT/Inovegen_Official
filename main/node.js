const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));

    document.querySelectorAll('.faq-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // Reveal animation (fail-safe: content is visible even if this never runs)
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Right-side scroll navigation (scrollspy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-link');
    function updateNav() {
      let current = 'home';
      sections.forEach(s => { if (window.pageYOffset >= s.offsetTop - 200) current = s.id; });
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === current));
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('load', updateNav);