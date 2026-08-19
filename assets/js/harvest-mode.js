// Harvest-season presentation. Runs on every page; does nothing when the shop is open.
(function () {
  if (window.FF_SHOP_OPEN !== false) return;

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Gentle ribbon under the header on every page
    var header = document.querySelector('.site-header');
    if (header) {
      var ribbon = document.createElement('div');
      ribbon.className = 'harvest-ribbon';
      ribbon.innerHTML =
        '<div class="container">🍯 <strong>It’s harvest season!</strong> The bees and I are bringing in this year’s honey — the online shop opens right after harvest.</div>';
      header.insertAdjacentElement('afterend', ribbon);
    }

    // 2. Home page: soften every ordering path
    document.querySelectorAll('a.button-primary[href="shop.html"]').forEach(function (a) {
      a.textContent = 'Peek at What’s Coming';
    });
    document.querySelectorAll('.hero-copy a[href^="tel:"]').forEach(function (a) {
      a.hidden = true;
    });
    var pickupLink = document.querySelector('a.text-link[href="#order"]');
    if (pickupLink) pickupLink.textContent = 'When can I buy?';

    var orderSection = document.querySelector('#order');
    if (orderSection) {
      var h2 = orderSection.querySelector('h2');
      if (h2) h2.textContent = 'Honey Is On Its Way';
      var firstP = orderSection.querySelector('p');
      if (firstP) {
        firstP.textContent =
          'I’m out in the bee yard bringing in this season’s harvest right now, so ordering is paused for a short while. The online shop opens as soon as the honey is jarred — join the honey list below and you’ll be the first to know.';
      }
      var list = orderSection.querySelector('ol');
      if (list) list.hidden = true;
      var buttons = orderSection.querySelector('.button-row');
      if (buttons) buttons.hidden = true;
      var comingSoon = orderSection.querySelectorAll('p');
      comingSoon.forEach(function (p) {
        if (/online checkout is coming soon/i.test(p.textContent)) p.hidden = true;
      });
    }

    // 3. Shop page intro copy
    var shopIntro = document.querySelector('.shop-header-row p');
    if (shopIntro) {
      shopIntro.textContent =
        'Here’s a peek at everything coming to the shop once this season’s harvest is in. Prices and ordering open soon!';
    }
  });
})();
