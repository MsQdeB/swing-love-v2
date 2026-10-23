// Swing Love — prototype behaviour
(function () {
  // Header: solid when scrolled (index starts transparent over the hero)
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add('is-solid');
      else if (!header.dataset.solid) header.classList.remove('is-solid');
    };
    // pages other than the home hero are pre-marked solid via inline class;
    // respect that by flagging it.
    if (header.classList.contains('is-solid')) header.dataset.solid = '1';
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 40, 240) + 'ms';
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Safety net: never leave content hidden (slow JS, odd viewports, print, etc.)
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        el.classList.add('in');
      });
    }, 700);
  });
})();
