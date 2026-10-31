/* Big Blue Vanuatu prototype: the only script on the site.
   Two jobs: the mobile menu, and the "Ways to pay" block. No libraries, no trackers. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     WAYS TO PAY
     Edit this list to change the "Ways to pay" block on the page.
     Each entry: name, detail (one short sentence), status.
     Keep status as "To confirm with Big Blue" until Big Blue signs it off.

     Do NOT add PayPal, Apple Pay, Google Pay, Stripe or Afterpay:
     they are reported not to work for a business in Vanuatu, so the
     page refuses to show them (see BLOCKED below).
     ------------------------------------------------------------------ */
  var WAYS_TO_PAY = [
    {
      name: "Card online at checkout",
      detail: "Pay by card when you book a dive or course on bigbluevanuatu.com.",
      status: "To confirm with Big Blue"
    },
    {
      name: "Pay at the dive shop",
      detail: "Settle up in person at our shop on the Port Vila seawall.",
      status: "To confirm with Big Blue"
    },
    {
      name: "Bank transfer",
      detail: "Pay straight into Big Blue's bank account. Ask us for the details.",
      status: "To confirm with Big Blue"
    }
  ];

  var BLOCKED = /pay\s*pal|apple\s*pay|google\s*pay|stripe|after\s*pay/i;

  function renderWaysToPay() {
    var list = document.getElementById("ways-to-pay");
    if (!list) return;
    list.textContent = "";
    WAYS_TO_PAY.forEach(function (m) {
      if (BLOCKED.test(m.name + " " + m.detail)) {
        if (window.console) console.warn("Ways to pay: skipped \"" + m.name + "\" (not available in Vanuatu)");
        return;
      }
      var li = document.createElement("li");
      li.className = "pay-item";
      var h = document.createElement("h4");
      h.textContent = m.name;
      var p = document.createElement("p");
      p.textContent = m.detail;
      var s = document.createElement("span");
      s.className = "pill";
      s.textContent = m.status;
      li.appendChild(h);
      li.appendChild(p);
      li.appendChild(s);
      list.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------
     MOBILE MENU
     ------------------------------------------------------------------ */
  function setupMenu() {
    var btn = document.querySelector(".menu-btn");
    var nav = document.getElementById("site-nav");
    if (!btn || !nav) return;
    document.documentElement.classList.add("js");
    function set(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("open", open);
    }
    btn.addEventListener("click", function () {
      set(btn.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        set(false);
        btn.focus();
      }
    });
  }

  /* Fade photos in once they arrive. Until then (or if a photo fails),
     the ocean gradient behind it shows instead of a blank box. */
  function setupPhotos() {
    var imgs = document.querySelectorAll("img.photo");
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.complete && img.naturalWidth) return img.classList.add("in");
      img.addEventListener("load", function () { img.classList.add("in"); });
    });
    var hero = document.querySelector(".hero img");
    if (hero) {
      var hide = function () { hero.classList.add("broken"); };
      if (hero.complete && !hero.naturalWidth) hide();
      hero.addEventListener("error", hide);
    }
  }

  renderWaysToPay();
  setupMenu();
  setupPhotos();
})();
