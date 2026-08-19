(function () {
  const STORAGE_HISTORY_KEY = 'redTopChatHistory';
  const STORAGE_MIN_KEY = 'redTopChatMinimized_v2';
  const STORAGE_EXPANDED_KEY = 'redTopChatExpanded_v2';

  const chatbotWrap = document.querySelector('.chatbot-wrap');
  if (!chatbotWrap) return;

  const panel = chatbotWrap.querySelector('#chatbot-panel');
  const toggleBtn = chatbotWrap.querySelector('.chatbot-toggle');
  const minBtn = chatbotWrap.querySelector('.chatbot-min');
  const messagesEl = chatbotWrap.querySelector('.chatbot-messages');
  const form = chatbotWrap.querySelector('.chatbot-form');
  const input = chatbotWrap.querySelector('#chatbot-input');
  const mascot = chatbotWrap.querySelector('.chatbot-mascot');

  if (!panel || !toggleBtn || !minBtn || !messagesEl || !form || !input || !mascot) return;

  const canonicalAnswers = [
    {
      answer:
        'You can order right here — add your favorites to the cart on the Shop page and check out securely with a card. Prefer to order directly? Text/call (716) 783-0857 or email RedTopAtFunnyFarm@gmail.com.',
      keywords: ['how do i order', 'order', 'buy', 'purchase', 'checkout']
    },
    {
      answer:
        'Yes — I ship! Flat-rate shipping is $7.00 per order. Local pickup in the Depew or Corfu/Darien area is always free; just message me to arrange it.',
      keywords: ['deliver', 'delivery', 'ship', 'shipping', 'online checkout']
    },
    {
      answer:
        'Free local pickup is available around Depew and Corfu/Darien in Western NY. After you order, message me and we\'ll set a simple spot + time.',
      keywords: ['where do i pick up', 'pickup location', 'pick up', 'meetup']
    },
    {
      answer:
        'As much as I have in stock! Small-batch harvests vary. For 1 gallon, 5 gallons, or bigger honey orders, message me directly for pricing.',
      keywords: ['how much can i order', 'minimum order', 'maximum order', 'quantities', 'quantity', 'bulk', 'gallon']
    },
    {
      answer:
        'Online orders take cards through Square\'s secure checkout. For local pickup, cash and popular mobile options work too.',
      keywords: ['payment', 'pay', 'cash', 'venmo', 'card', 'zelle']
    },
    {
      answer:
        'My honey is also at a few local shops — Depew Deli, Elador Rose Boutique, Marlene & Phil\'s, Nana\'s Mediterranean in Alden, and more. See the Locations page for the full list.',
      keywords: ['store', 'stores', 'where to buy', 'locations', 'shops', 'retail']
    },
    {
      answer:
        'Yes! My original handmade lip balms are back — Bee Kissable, Buzzed Bees, Lip Stuff for Dudes, and more — plus skincare returning soon. Check the Shop page.',
      keywords: ['lip balm', 'lip stuff', 'balm', 'chapstick', 'skincare', 'lotion', 'skin care']
    },
    {
      answer:
        'Yes — my honey is raw and minimally handled. I don\'t overheat it, so it keeps its natural character.',
      keywords: ['is your honey raw', 'raw honey', 'is it raw']
    },
    {
      answer:
        'Raw honey isn\'t heavily processed. It may be lightly warmed for bottling, but not cooked or ultra-filtered.',
      keywords: ['what does raw mean', 'define raw', 'meaning of raw']
    },
    {
      answer:
        'I strain gently to remove big bits of wax, but I keep it as close to the hive as possible.',
      keywords: ['filter', 'filtered', 'strain', 'do you filter']
    },
    {
      answer:
        'That\'s crystallization — totally natural and a sign it\'s real honey. Different harvests crystallize differently.',
      keywords: ['thick', 'grainy', 'crystal', 'crystallized', 'solid']
    },
    {
      answer:
        'Place the jar in warm water (not boiling) and let it slowly loosen. Keep it gentle — think cozy warmth, not cooking.',
      keywords: ['soften', 'liquid', 'decrystallize', 'melt']
    },
    {
      answer:
        'Honey is famous for lasting a very long time when stored sealed. If it thickens, that\'s normal, not spoilage.',
      keywords: ['go bad', 'expire', 'shelf life', 'spoiled']
    },
    {
      answer:
        'Room temperature is best, lid on tight. Avoid leaving it near high heat for long periods.',
      keywords: ['store', 'storage', 'keep honey', 'how should i store honey']
    },
    {
      answer: 'No — babies under 12 months shouldn\'t have honey.',
      keywords: ['babies', 'baby', 'infant', 'under 1']
    },
    {
      answer:
        'Honey is still a sugar. I\'m happy to share ingredients, but for health decisions it\'s best to check with your clinician.',
      keywords: ['diabetic', 'diabetes', 'blood sugar']
    },
    {
      answer:
        'People love local honey for lots of reasons, but I can\'t promise allergy results. It is delicious and seasonal.',
      keywords: ['allergy', 'allergies', 'pollen']
    },
    {
      answer:
        'Because flowers change through the season. Every harvest has its own floral "signature."',
      keywords: ['taste different', 'different than last time', 'flavor changed', 'flavour changed']
    },
    {
      answer:
        'It depends on nectar sources. Darker honeys can taste bolder; lighter can taste more delicate.',
      keywords: ['light and dark', 'dark honey', 'light honey', 'difference between']
    },
    {
      answer:
        '"She\'s a Hot Honey" is my raw honey blended with homegrown cherry bomb peppers — in 8 oz, 1 lb, and a 12 oz beehive gift jar. It\'s on the Shop page!',
      keywords: ['hot honey', 'infused', 'spicy honey']
    },
    {
      answer:
        '"She\'s a Cherry Bomb" is my farm-to-bottle hot sauce — smooth, medium heat that builds. Grab the 8 oz bottle on the Shop page.',
      keywords: ['cherry bomb', 'hot sauce', 'sauce details']
    }
  ];

  // Harvest-season mode: pause every "order now" invitation.
  if (window.FF_SHOP_OPEN === false) {
    const harvest =
      'It\'s harvest season! 🍯 The bees and I are bringing in this year\'s honey, so ordering is paused for a short while. The online shop opens right after harvest — join the honey list on the home page and you\'ll be the first to know.';
    const pauseKeywords = ['how do i order', 'order', 'buy', 'purchase', 'checkout', 'deliver', 'delivery', 'ship', 'shipping', 'online checkout', 'where do i pick up', 'pickup location', 'pick up', 'meetup', 'payment', 'pay', 'cash', 'venmo', 'card', 'zelle', 'how much can i order', 'minimum order', 'quantities', 'quantity', 'bulk', 'gallon'];
    canonicalAnswers.forEach((entry) => {
      if (entry.keywords.some((k) => pauseKeywords.includes(k))) {
        entry.answer = harvest;
      }
    });
  }

  const fallbackAnswer = window.FF_SHOP_OPEN === false
    ? 'I can help! Quick heads-up: it\'s harvest season, so the shop opens a little later. Ask me about raw honey, storage, crystallization — or join the honey list on the home page to hear the moment it\'s ready.'
    : 'I can help! Try asking about ordering, shipping, pickup, lip balm, raw honey, or crystallization. Or text/call (716) 783-0857. You can also visit the FAQ page.';

  function normalize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function bestMatch(question) {
    const normalized = normalize(question);
    let best = null;

    canonicalAnswers.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((keyword) => {
        const normalizedKeyword = normalize(keyword);
        if (normalized.includes(normalizedKeyword)) {
          score += normalizedKeyword.split(' ').length;
        }
      });
      if (score > 0 && (!best || score > best.score)) {
        best = { score: score, answer: entry.answer };
      }
    });

    return best ? best.answer : fallbackAnswer;
  }

  function readHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_HISTORY_KEY) || '[]');
    } catch (err) {
      return [];
    }
  }

  function writeHistory(history) {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
  }

  function appendMessage(sender, text, save) {
    const message = document.createElement('div');
    message.className = 'chatbot-message chatbot-message--' + sender;
    message.textContent = text;
    messagesEl.appendChild(message);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    if (save) {
      const current = readHistory();
      current.push({ sender: sender, text: text });
      writeHistory(current.slice(-40));
    }
  }

  function setExpandedState(expanded) {
    chatbotWrap.classList.toggle('is-expanded', expanded);
    chatbotWrap.classList.toggle('is-compact', !expanded);
    panel.setAttribute('aria-expanded', String(expanded));
    localStorage.setItem(STORAGE_EXPANDED_KEY, expanded ? '1' : '0');
  }

  function setMinimizedState(minimized) {
    chatbotWrap.classList.toggle('is-minimized', minimized);
    panel.hidden = minimized;
    toggleBtn.setAttribute('aria-expanded', String(!minimized));
    localStorage.setItem(STORAGE_MIN_KEY, minimized ? '1' : '0');

    if (!minimized) {
      setExpandedState(localStorage.getItem(STORAGE_EXPANDED_KEY) !== '0');
    }
  }

  const priorHistory = readHistory();
  if (priorHistory.length) {
    priorHistory.forEach((item) => appendMessage(item.sender, item.text, false));
  } else {
    appendMessage(
      'bot',
      'Hi honey friend — I\'m Red Top. Ask me about ordering, pickup, raw honey, storage, or crystallization.',
      true
    );
  }

  // Default to the small mascot bubble until the visitor opens the chat.
  const isMinimized = localStorage.getItem(STORAGE_MIN_KEY) !== '0';
  const isExpanded = localStorage.getItem(STORAGE_EXPANDED_KEY) !== '0';

  setExpandedState(isExpanded);
  setMinimizedState(isMinimized);

  toggleBtn.addEventListener('click', function () {
    const minimized = chatbotWrap.classList.contains('is-minimized');

    if (minimized) {
      setMinimizedState(false);
    } else {
      setMinimizedState(true);
    }
  });

  minBtn.addEventListener('click', function () {
    setExpandedState(false);
  });

  function expandFromInteraction() {
    if (chatbotWrap.classList.contains('is-minimized')) return;
    setExpandedState(true);
  }

  mascot.addEventListener('click', expandFromInteraction);
  mascot.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      expandFromInteraction();
    }
  });

  input.addEventListener('focus', expandFromInteraction);
  input.addEventListener('click', expandFromInteraction);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !chatbotWrap.classList.contains('is-minimized')) {
      setMinimizedState(true);
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    if (chatbotWrap.classList.contains('is-compact')) {
      setExpandedState(true);
    }

    appendMessage('user', question, true);
    appendMessage('bot', bestMatch(question), true);
    input.value = '';
    input.focus();
  });
})();
