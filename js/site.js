/* Big Blue Vanuatu prototype: the only script. Phone menu, home slider arrows,
   cruise-page gallery thumbnails, and the contact-page map (loaded only on request). */
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('open', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
    });
  }

  var slider = document.getElementById('slider');
  if (slider) {
    var slides = slider.querySelectorAll('.slide');
    var cur = 0;
    var show = function (n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.hidden = false;
        s.classList.toggle('on', i === cur);
        s.setAttribute('aria-hidden', i === cur ? 'false' : 'true');
      });
    };
    slider.querySelector('.sl-prev').addEventListener('click', function () { show(cur - 1); });
    slider.querySelector('.sl-next').addEventListener('click', function () { show(cur + 1); });
  }

  var gallery = document.getElementById('gallery');
  if (gallery) {
    var big = document.getElementById('gallery-big');
    gallery.querySelectorAll('.thumbs button').forEach(function (b) {
      b.addEventListener('click', function () {
        big.src = b.dataset.src; big.width = b.dataset.w; big.height = b.dataset.h; big.alt = b.dataset.alt;
        big.parentNode.href = b.dataset.src;
        gallery.querySelectorAll('.thumbs button').forEach(function (o) { o.setAttribute('aria-current', o === b ? 'true' : 'false'); });
      });
    });
  }

  var mapBtn = document.querySelector('[data-map]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = mapBtn.dataset.map;
      f.title = 'Map: Big Blue Vanuatu, Port Vila';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      var box = document.getElementById('map');
      box.innerHTML = '';
      box.style.padding = '0';
      box.appendChild(f);
    });
  }
})();
