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

    // 4. Chatbot footer: drop the Text/Call + Email order links, keep the FAQ link
    document.querySelectorAll('.chatbot-footer a[href^="tel:"], .chatbot-footer a[href^="mailto:"], .chatbot-footer span').forEach(function (el) {
      el.hidden = true;
    });

    // 5. FAQ page: swap the ordering answers for harvest-season ones
    var harvestNote =
      'It’s harvest season! The shop opens right after this year’s honey is jarred. Join the honey list on the home page and you’ll be the first to know.';
    document.querySelectorAll('h3').forEach(function (h3) {
      var text = h3.textContent.trim().toLowerCase();
      var answer = h3.nextElementSibling;
      if (text === 'how does ordering work?') {
        h3.textContent = 'When can I order?';
        if (answer && answer.tagName === 'P') answer.textContent = harvestNote;
      }
      if (text === 'where are pickups?') {
        if (answer && answer.tagName === 'P') {
          answer.textContent =
            'Once the shop reopens, orders ship anywhere and free local pickup is available around Depew and Corfu/Darien.';
        }
      }
      if (text === 'how ordering works') {
        // Contact page
        h3.textContent = 'When can I order?';
        var ol = h3.parentElement.querySelector('ol');
        if (ol) ol.hidden = true;
        var note = document.createElement('p');
        note.textContent = harvestNote;
        h3.insertAdjacentElement('afterend', note);
        h3.parentElement.querySelectorAll('p').forEach(function (p) {
          if (/pickup areas/i.test(p.textContent)) p.hidden = true;
        });
      }
    });

    // 6. Contact page heading: general contact, not orders
    document.querySelectorAll('h2').forEach(function (h2) {
      if (/contact\s*&\s*local orders/i.test(h2.textContent)) h2.textContent = 'Contact';
    });
  });
})();
