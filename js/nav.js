(function () {
  var nav = document.querySelector('.site-nav');
  var btn = document.querySelector('.nav-toggle');
  if (!nav || !btn) return;
  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });
  nav.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) setOpen(false);
  });
})();
