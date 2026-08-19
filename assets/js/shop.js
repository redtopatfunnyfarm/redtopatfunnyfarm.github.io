const CART_KEY = "ff_cart";

const PLACEHOLDER_IMG = "assets/img/products/placeholder-coming-soon.png";

const CATALOG = [
  {
    category: "She's as Sweet as Can Bee — Raw Honey",
    note: null,
    products: [
      {
        id: "raw-honey-8oz",
        name: "She's as Sweet as Can Bee — Raw Honey, 8 oz",
        title: "Raw Honey — 8 oz",
        price: 8,
        image: "assets/img/products/raw-honey-8oz.webp",
        blurb: "A little jar of pure, raw, unfiltered honey — perfect for gifting or a first taste."
      },
      {
        id: "raw-honey-1lb",
        name: "She's as Sweet as Can Bee — Raw Honey, 1 lb",
        title: "Raw Honey — 1 lb",
        price: 13,
        image: "assets/img/products/raw-honey-1lb-wildflower.webp",
        blurb: "Pure, raw, unfiltered honey straight from my hives — full of natural goodness."
      },
      {
        id: "raw-honey-2-5lb",
        name: "She's as Sweet as Can Bee — Raw Honey, 2.5 lb",
        title: "Raw Honey — 2.5 lb",
        price: 27,
        image: "assets/img/products/raw-honey-2-5lb-wildflower.png",
        blurb: "Small-batch raw honey with natural enzymes, pollen, and floral character."
      },
      {
        id: "raw-honey-5lb",
        name: "She's as Sweet as Can Bee — Raw Honey, 5 lb",
        title: "Raw Honey — 5 lb",
        price: 52,
        image: "assets/img/products/5 lb honey.webp",
        blurb: "A big pantry-ready jug of raw, unfiltered honey — for serious honey lovers."
      }
    ],
    footer: 'Need 1 gallon, 5 gallons, or more? <a href="contact.html">Message me directly</a> for bulk honey.'
  },
  {
    category: "She's a Hot Honey — Sweet Heat",
    products: [
      {
        id: "hot-honey-12oz-skep",
        name: "She's a Hot Honey — 12 oz Skep Gift Jar",
        title: "Hot Honey — 12 oz Skep Gift Jar",
        price: 15,
        image: "assets/img/products/hot-honey-12oz-skep.webp",
        blurb: "My raw honey + homegrown cherry bomb peppers in a keepsake beehive jar."
      },
      {
        id: "hot-honey-1lb",
        name: "She's a Hot Honey — 1 lb Jar",
        title: "Hot Honey — 1 lb Jar",
        price: 16,
        image: "assets/img/products/hot-honey-1lb.webp",
        blurb: "Sweet heat made with raw honey and cherry bomb peppers — the big jar."
      },
      {
        id: "hot-honey-8oz",
        name: "She's a Hot Honey — 8 oz",
        title: "Hot Honey — 8 oz",
        price: 10,
        image: "assets/img/products/Cherry Bomb hot honey 8 oz.webp",
        blurb: "A spicy-sweet drizzle perfect for wings, pizza, and breakfast."
      }
    ]
  },
  {
    category: "She's a Cherry Bomb — Hot Sauce",
    products: [
      {
        id: "hot-sauce-8oz",
        name: "She's a Cherry Bomb — Hot Sauce, 8 oz",
        title: "Cherry Bomb Hot Sauce — 8 oz",
        price: 13,
        image: "assets/img/products/hot-sauce-8oz-full.webp",
        blurb: "Smooth, medium heat that builds beautifully — bright, bold, pepper-forward flavor."
      }
    ]
  },
  {
    category: "Lip Balms & Body Balms",
    note: "My original handmade balms are back — made with beeswax, raw honey, almond oil, and cocoa butter from my own recipes. Fresh batch photos coming as each flavor is poured.",
    products: [
      {
        id: "bee-kissable",
        name: "Bee Kissable — Lip Balm",
        title: "Bee Kissable",
        price: 3.3,
        image: "assets/img/products/balm-bee-kissable.jpg",
        blurb: "My classic beeswax lip balm in flavors like Tahitian Beenilla — kissably soft."
      },
      {
        id: "buzzed-bees",
        name: "Buzzed Bees — Lip Balm",
        title: "Buzzed Bees",
        price: 3.3,
        image: "assets/img/products/balm-buzzed-bees.jpg",
        blurb: "A fun, flavored beeswax lip balm with a little extra buzz."
      },
      {
        id: "lip-stuff-for-dudes",
        name: "Lip Stuff for Dudes — Lip Balm",
        title: "Lip Stuff for Dudes",
        price: 3.3,
        image: "assets/img/products/balm-lip-stuff-for-dudes.jpg",
        blurb: "No-nonsense beeswax and honey lip balm. For dudes. And everyone else."
      },
      {
        id: "sun-of-a-beech-balm",
        name: "Sun of a Beech Balm — Lip Balm",
        title: "Sun of a Beech Balm",
        price: 4.4,
        image: "assets/img/products/balm-sun-of-a-beech-balm.jpg",
        blurb: "Beeswax lip balm made for sunny days outside on the farm."
      },
      {
        id: "blizzard-bee-balm",
        name: "Blizzard Bee Balm — Lip Balm",
        title: "Blizzard Bee Balm",
        price: 4.4,
        image: "assets/img/products/balm-blizzard-bee-balm.jpg",
        blurb: "Winter-strength balm for wind-chapped lips — made for WNY winters."
      },
      {
        id: "bee-clear",
        name: "Bee Clear — Blemish Stick",
        title: "Bee Clear Blemish Stick",
        price: 6.6,
        image: "assets/img/products/mock-bee-clear.jpg",
        blurb: "My beeswax blemish stick — great on pimples, bug bites, and bee stings."
      },
      {
        id: "bee-paws-paw-balm",
        name: "Bee Paws — Paw Balm",
        title: "Bee Paws Paw Balm",
        price: 11,
        image: "assets/img/products/mock-bee-paws-paw-balm.jpg",
        blurb: "Gentle beeswax balm for your pup's dry, cracked paws — farm-tested."
      },
      {
        id: "bombshell-lip-balm",
        name: "Bombshell — Lip Stuff for Dudes",
        title: "Bombshell",
        price: 3.3,
        image: "assets/img/products/balm-bombshell-lip-balm.jpg",
        blurb: "The black cherry bombshell of my Lip Stuff for Dudes line."
      },
      {
        id: "bourbon-buzz-lip-balm",
        name: "Bourbon Buzz — Lip Stuff for Dudes",
        title: "Bourbon Buzz",
        price: 3.3,
        image: "assets/img/products/balm-bourbon-buzz-lip-balm.jpg",
        blurb: "Beeswax, honey, and a warm bourbon flavor — no ID required."
      },
      {
        id: "barrel-of-rum-coke-lip-balm",
        name: "Barrel of Rum & Coke — Lip Stuff for Dudes",
        title: "Barrel of Rum & Coke",
        price: 3.3,
        image: "assets/img/products/balm-barrel-of-rum-coke-lip-balm.jpg",
        blurb: "Rum-and-coke flavored beeswax balm from my Lip Stuff for Dudes line."
      }
    ]
  },
  {
    category: "Skincare",
    note: "Small-batch skincare made with raw honey, beeswax, and botanicals. Returning favorites — images below are concept mockups until each batch is photographed.",
    products: [
      {
        id: "cocoa-butter-lotion",
        name: "Cocoa Butter Lotion",
        title: "Cocoa Butter Lotion",
        price: 14.3,
        image: "assets/img/products/mock-cocoa-butter-lotion.jpg",
        blurb: "Rich, silky cocoa butter lotion that drinks right into thirsty skin."
      },
      {
        id: "honey-almond-lotion",
        name: "Honey Almond Lotion",
        title: "Honey Almond Lotion",
        price: 14.3,
        image: "assets/img/products/mock-honey-almond-lotion.jpg",
        blurb: "Everyday lotion with my raw honey and warm almond — light and lovely."
      },
      {
        id: "tea-tree-vinegar-facial-toner",
        name: "Tea Tree & Vinegar Facial Toner",
        title: "Tea Tree & Vinegar Toner",
        price: 17.6,
        image: "assets/img/products/mock-tea-tree-vinegar-facial-toner.jpg",
        blurb: "A bright, clarifying toner with tea tree and vinegar to reset your skin."
      },
      {
        id: "rajeunir-body-mist",
        name: "Rajeunir Body Mist",
        title: "Rajeunir Body Mist",
        price: 20.9,
        image: "assets/img/products/mock-rajeunir-body-mist.jpg",
        blurb: "A refreshing all-over mist that leaves skin soft and lightly scented."
      },
      {
        id: "clearly-beeautiful",
        name: "Clearly Beeautiful",
        title: "Clearly Beeautiful",
        price: 22,
        image: "assets/img/products/mock-clearly-beeautiful.jpg",
        blurb: "My honey-powered clear-skin favorite — gentle enough for every day."
      },
      {
        id: "honey-almond-cream",
        name: "Honey Almond Cream",
        title: "Honey Almond Cream",
        price: 23.1,
        image: "assets/img/products/mock-honey-almond-cream.jpg",
        blurb: "A richer, deeper version of my honey almond moisture — for dry days."
      },
      {
        id: "pumpkin-masque",
        name: "Pumpkin Masque",
        title: "Pumpkin Masque",
        price: 24.2,
        image: "assets/img/products/mock-pumpkin-masque.jpg",
        blurb: "A cozy, enzyme-rich pumpkin masque that polishes while it pampers."
      },
      {
        id: "wild-oats-honey-facial-cleanser",
        name: "Wild Oats & Honey Facial Cleanser",
        title: "Wild Oats & Honey Cleanser",
        price: 26.4,
        image: "assets/img/products/mock-wild-oats-honey-facial-cleanser.jpg",
        blurb: "Mild and gentle daily cleanser with oats and raw honey — deep clean, soft finish."
      },
      {
        id: "aha-mint-walnut-polish",
        name: "AHA Mint Walnut Polish",
        title: "AHA Mint Walnut Polish",
        price: 30.8,
        image: "assets/img/products/mock-aha-mint-walnut-polish.jpg",
        blurb: "A tingly mint-walnut facial polish with natural AHAs for a fresh glow."
      },
      {
        id: "supreme-facial-serum",
        name: "Supreme Facial Serum with DMAE",
        title: "Supreme Facial Serum",
        price: 33,
        image: "assets/img/products/mock-supreme-facial-serum.jpg",
        blurb: "My most-loved serum, with DMAE for firm, dewy, happy skin."
      },
      {
        id: "vector-lift-creme",
        name: "Vector Lift Creme",
        title: "Vector Lift Creme",
        price: 33,
        image: "assets/img/products/mock-vector-lift-creme.jpg",
        blurb: "A lifting, firming night creme for when your skin needs backup."
      }
    ]
  },
  {
    category: "The Wildcraft Farmacy",
    note: "Small-batch creations from my garden, fields, and forest — gathered responsibly, made in harmony with nature. More wildcrafted goods are on the way.",
    products: [
      {
        id: "herbal-spa-hair-body-wash",
        name: "Herbal Spa Hair & Body Wash",
        title: "Herbal Spa Hair & Body Wash",
        price: 19.8,
        image: "assets/img/products/mock-herbal-spa-hair-body-wash.jpg",
        blurb: "One bottle, head to toe — an herbal wash that smells like a day at the spa."
      }
    ]
  },
  {
    category: "Kits & Gift Sets",
    products: [
      {
        id: "bath-body-essentials-kit",
        name: "Bath & Body Essentials Kit",
        title: "Bath & Body Essentials Kit",
        price: 56.1,
        image: "assets/img/products/originals/bath-and-body-essentials-kit.jpg",
        blurb: "A full lineup of my bath & body favorites, bundled up and ready to gift."
      },
      {
        id: "skin-care-starter-kit",
        name: "Skin Care Essentials Starter Kit",
        title: "Skin Care Starter Kit",
        price: 68.2,
        image: "assets/img/products/mock-skin-care-starter-kit.jpg",
        blurb: "Everything you need to start a honey-powered skincare routine."
      }
    ]
  }
];

const PRODUCTS = {};
CATALOG.forEach((section) => {
  section.products.forEach((product) => {
    PRODUCTS[product.id] = product;
  });
});

function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

const SHOP_OPEN = window.FF_SHOP_OPEN !== false;

function renderCatalog() {
  const root = document.getElementById("shop-catalog");
  if (!root) {
    return;
  }

  const buyBlock = (product) => SHOP_OPEN
    ? `<p class="shop-price">$${product.price.toFixed(2)}</p>
       <button type="button" data-add-to-cart="${product.id}">Add to cart</button>`
    : `<p class="coming-soon-chip">Coming after harvest 🍯</p>`;

  root.innerHTML = CATALOG.map((section) => `
    <h3 class="shop-category-title">${escapeHtml(section.category)}</h3>
    ${section.note ? `<p class="shop-category-lead">${escapeHtml(section.note)}</p>` : ""}
    <div class="product-grid shop-grid">
      ${section.products.map((product) => `
        <article class="product-card">
          <img class="shop-product-image" src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" role="button" tabindex="0" data-product-id="${product.id}" data-price="${product.price.toFixed(2)}" data-name="${escapeHtml(product.name)}" />
          <h3>${escapeHtml(product.title)}</h3>
          <p>${escapeHtml(product.blurb)}</p>
          ${buyBlock(product)}
        </article>
      `).join("")}
    </div>
    ${section.footer && SHOP_OPEN ? `<p class="shop-category-note">${section.footer}</p>` : ""}
  `).join("");
}

let lastFocusedImage = null;
let modalState = {
  productId: null,
  price: 0
};

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY));
    if (!data || typeof data !== "object") {
      return {};
    }

    return Object.entries(data).reduce((acc, [productId, qty]) => {
      if (PRODUCTS[productId] && Number.isInteger(qty) && qty > 0) {
        acc[productId] = qty;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  if (!PRODUCTS[productId]) {
    return false;
  }

  const cart = loadCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  renderCart();
  return true;
}

function removeFromCart(productId) {
  const cart = loadCart();
  if (!cart[productId]) {
    return;
  }

  delete cart[productId];
  saveCart(cart);
  renderCart();
}

function updateQty(productId, delta) {
  const cart = loadCart();
  if (!cart[productId]) {
    return;
  }

  const nextQty = cart[productId] + delta;
  if (nextQty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = nextQty;
  }

  saveCart(cart);
  renderCart();
}

function getSubtotal(cart) {
  return Object.entries(cart).reduce((sum, [productId, qty]) => {
    const product = PRODUCTS[productId];
    return product ? sum + product.price * qty : sum;
  }, 0);
}

function renderCart() {
  const cart = loadCart();
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartSubtotalEl = document.getElementById("cart-subtotal");

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  cartCountEl.textContent = String(totalItems);

  const subtotal = getSubtotal(cart);
  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  if (totalItems === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  cartItemsEl.innerHTML = Object.entries(cart)
    .map(([productId, qty]) => {
      const product = PRODUCTS[productId];
      if (!product) {
        return "";
      }

      return `
        <article class="cart-item" data-cart-item="${product.id}">
          <img class="cart-item__thumb" src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
          <div class="cart-item__details">
            <h3>${escapeHtml(product.name)}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <div class="cart-item__controls">
              <button type="button" data-qty-change="${product.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
              <span aria-live="polite">${qty}</span>
              <button type="button" data-qty-change="${product.id}" data-delta="1" aria-label="Increase quantity">+</button>
              <button type="button" class="cart-remove" data-remove-item="${product.id}">Remove</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function openCart() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  const button = document.getElementById("open-cart-button");

  overlay.hidden = false;
  overlay.classList.add("is-open");
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  button.setAttribute("aria-expanded", "true");
}

function closeCart() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  const button = document.getElementById("open-cart-button");

  overlay.classList.remove("is-open");
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  button.setAttribute("aria-expanded", "false");

  setTimeout(() => {
    if (!drawer.classList.contains("is-open")) {
      overlay.hidden = true;
    }
  }, 220);
}

function openImageModal({ src, alt, productId, price }) {
  const overlay = document.getElementById("image-modal-overlay");
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("image-modal-img");
  const modalPrice = document.getElementById("image-modal-price");

  modalImg.src = src;
  modalImg.alt = alt;
  modalPrice.textContent = SHOP_OPEN ? `$${Number(price).toFixed(2)}` : "Coming after harvest 🍯";
  document.getElementById("image-modal-add").hidden = !SHOP_OPEN;

  modalState = {
    productId,
    price: Number(price)
  };

  overlay.hidden = false;
  overlay.classList.add("is-open");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  document.getElementById("image-modal-close").focus();
}

function closeImageModal() {
  const overlay = document.getElementById("image-modal-overlay");
  const modal = document.getElementById("image-modal");

  overlay.classList.remove("is-open");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    if (!modal.classList.contains("is-open")) {
      overlay.hidden = true;
    }
  }, 220);

  if (lastFocusedImage) {
    lastFocusedImage.focus();
  }
}

function bindEvents() {
  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      const added = addToCart(button.dataset.addToCart);
      if (added) {
        openCart();
      }
    });
  });

  document.querySelectorAll(".shop-product-image[role='button']").forEach((image) => {
    const openFromImage = () => {
      lastFocusedImage = image;
      openImageModal({
        src: image.currentSrc || image.src,
        alt: image.dataset.name || image.alt,
        productId: image.dataset.productId,
        price: image.dataset.price || PRODUCTS[image.dataset.productId]?.price || 0
      });
    };

    image.addEventListener("click", openFromImage);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFromImage();
      }
    });
  });

  document.getElementById("image-modal-overlay").addEventListener("click", closeImageModal);
  document.getElementById("image-modal-close").addEventListener("click", closeImageModal);
  document.getElementById("image-modal-add").addEventListener("click", () => {
    if (modalState.productId && addToCart(modalState.productId)) {
      openCart();
      closeImageModal();
    }
  });

  document.getElementById("open-cart-button").addEventListener("click", openCart);
  document.getElementById("close-cart-button").addEventListener("click", closeCart);
  document.getElementById("continue-shopping").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);

  document.getElementById("cart-items").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-item]");
    if (removeButton) {
      removeFromCart(removeButton.dataset.removeItem);
      return;
    }

    const qtyButton = event.target.closest("[data-qty-change]");
    if (qtyButton) {
      updateQty(qtyButton.dataset.qtyChange, Number(qtyButton.dataset.delta));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeImageModal();
      closeCart();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderCatalog();

  if (!SHOP_OPEN) {
    // Harvest mode: preview only — no cart, no checkout entry points.
    const cartButton = document.getElementById("open-cart-button");
    if (cartButton) cartButton.hidden = true;

    document.querySelectorAll(".shop-product-image[role='button']").forEach((image) => {
      const openFromImage = () => {
        lastFocusedImage = image;
        openImageModal({
          src: image.currentSrc || image.src,
          alt: image.dataset.name || image.alt,
          productId: image.dataset.productId,
          price: image.dataset.price || 0
        });
      };
      image.addEventListener("click", openFromImage);
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFromImage();
        }
      });
    });
    document.getElementById("image-modal-overlay").addEventListener("click", closeImageModal);
    document.getElementById("image-modal-close").addEventListener("click", closeImageModal);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeImageModal();
    });
    return;
  }

  bindEvents();
  renderCart();
});
