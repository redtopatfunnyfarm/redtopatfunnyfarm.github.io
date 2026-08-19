const CART_KEY = "ff_cart";
const SQUARE_APPLICATION_ID = "sandbox-sq0idb-NVFEBrBqyL9PTvkW-ocDyA";
const SQUARE_LOCATION_ID = "LG3N4XZKSD2YZ";
const SHIPPING_CENTS = 700;
const SANDBOX_TAX_RATE = 0.0875;

const PLACEHOLDER_IMG = "assets/img/products/placeholder-coming-soon.png";

const PRODUCTS = {
  "raw-honey-8oz": { name: "She's as Sweet as Can Bee — Raw Honey, 8 oz", priceCents: 800, image: "assets/img/products/raw-honey-8oz.webp" },
  "raw-honey-1lb": { name: "She's as Sweet as Can Bee — Raw Honey, 1 lb", priceCents: 1300, image: "assets/img/products/raw-honey-1lb-wildflower.webp" },
  "raw-honey-2-5lb": { name: "She's as Sweet as Can Bee — Raw Honey, 2.5 lb", priceCents: 2700, image: "assets/img/products/raw-honey-2-5lb-wildflower.png" },
  "raw-honey-5lb": { name: "She's as Sweet as Can Bee — Raw Honey, 5 lb", priceCents: 5200, image: "assets/img/products/5 lb honey.webp" },
  "hot-honey-12oz-skep": { name: "She's a Hot Honey — 12 oz Skep Gift Jar", priceCents: 1500, image: "assets/img/products/hot-honey-12oz-skep.webp" },
  "hot-honey-1lb": { name: "She's a Hot Honey — 1 lb Jar", priceCents: 1600, image: "assets/img/products/hot-honey-1lb.webp" },
  "hot-honey-8oz": { name: "She's a Hot Honey — 8 oz", priceCents: 1000, image: "assets/img/products/Cherry Bomb hot honey 8 oz.webp" },
  "hot-sauce-8oz": { name: "She's a Cherry Bomb — Hot Sauce, 8 oz", priceCents: 1300, image: "assets/img/products/hot-sauce-8oz-full.webp" },
  "bee-kissable": { name: "Bee Kissable — Lip Balm", priceCents: 330, image: "assets/img/products/balm-bee-kissable.jpg" },
  "buzzed-bees": { name: "Buzzed Bees — Lip Balm", priceCents: 330, image: "assets/img/products/balm-buzzed-bees.jpg" },
  "lip-stuff-for-dudes": { name: "Lip Stuff for Dudes — Lip Balm", priceCents: 330, image: "assets/img/products/balm-lip-stuff-for-dudes.jpg" },
  "sun-of-a-beech-balm": { name: "Sun of a Beech Balm — Lip Balm", priceCents: 440, image: "assets/img/products/balm-sun-of-a-beech-balm.jpg" },
  "blizzard-bee-balm": { name: "Blizzard Bee Balm — Lip Balm", priceCents: 440, image: "assets/img/products/balm-blizzard-bee-balm.jpg" },
  "bee-clear": { name: "Bee Clear — Blemish Stick", priceCents: 660, image: "assets/img/products/mock-bee-clear.jpg" },
  "bee-paws-paw-balm": { name: "Bee Paws — Paw Balm", priceCents: 1100, image: "assets/img/products/mock-bee-paws-paw-balm.jpg" },
  "bombshell-lip-balm": { name: "Bombshell — Lip Stuff for Dudes", priceCents: 330, image: "assets/img/products/balm-bombshell-lip-balm.jpg" },
  "bourbon-buzz-lip-balm": { name: "Bourbon Buzz — Lip Stuff for Dudes", priceCents: 330, image: "assets/img/products/balm-bourbon-buzz-lip-balm.jpg" },
  "barrel-of-rum-coke-lip-balm": { name: "Barrel of Rum & Coke — Lip Stuff for Dudes", priceCents: 330, image: "assets/img/products/balm-barrel-of-rum-coke-lip-balm.jpg" },
  "cocoa-butter-lotion": { name: "Cocoa Butter Lotion", priceCents: 1430, image: "assets/img/products/mock-cocoa-butter-lotion.jpg" },
  "honey-almond-lotion": { name: "Honey Almond Lotion", priceCents: 1430, image: "assets/img/products/mock-honey-almond-lotion.jpg" },
  "tea-tree-vinegar-facial-toner": { name: "Tea Tree & Vinegar Facial Toner", priceCents: 1760, image: "assets/img/products/mock-tea-tree-vinegar-facial-toner.jpg" },
  "rajeunir-body-mist": { name: "Rajeunir Body Mist", priceCents: 2090, image: "assets/img/products/mock-rajeunir-body-mist.jpg" },
  "clearly-beeautiful": { name: "Clearly Beeautiful", priceCents: 2200, image: "assets/img/products/mock-clearly-beeautiful.jpg" },
  "honey-almond-cream": { name: "Honey Almond Cream", priceCents: 2310, image: "assets/img/products/mock-honey-almond-cream.jpg" },
  "pumpkin-masque": { name: "Pumpkin Masque", priceCents: 2420, image: "assets/img/products/mock-pumpkin-masque.jpg" },
  "wild-oats-honey-facial-cleanser": { name: "Wild Oats & Honey Facial Cleanser", priceCents: 2640, image: "assets/img/products/mock-wild-oats-honey-facial-cleanser.jpg" },
  "aha-mint-walnut-polish": { name: "AHA Mint Walnut Polish", priceCents: 3080, image: "assets/img/products/mock-aha-mint-walnut-polish.jpg" },
  "supreme-facial-serum": { name: "Supreme Facial Serum with DMAE", priceCents: 3300, image: "assets/img/products/mock-supreme-facial-serum.jpg" },
  "vector-lift-creme": { name: "Vector Lift Creme", priceCents: 3300, image: "assets/img/products/mock-vector-lift-creme.jpg" },
  "herbal-spa-hair-body-wash": { name: "Herbal Spa Hair & Body Wash", priceCents: 1980, image: "assets/img/products/mock-herbal-spa-hair-body-wash.jpg" },
  "bath-body-essentials-kit": { name: "Bath & Body Essentials Kit", priceCents: 5610, image: "assets/img/products/originals/bath-and-body-essentials-kit.jpg" },
  "skin-care-starter-kit": { name: "Skin Care Essentials Starter Kit", priceCents: 6820, image: "assets/img/products/mock-skin-care-starter-kit.jpg" }
};

function money(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function getCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    return Object.entries(saved).reduce((cart, [id, quantity]) => {
      if (PRODUCTS[id] && Number.isInteger(quantity) && quantity > 0 && quantity <= 25) {
        cart[id] = quantity;
      }
      return cart;
    }, {});
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function changeQty(id, delta) {
  const cart = getCart();
  if (!cart[id] && delta <= 0) {
    return cart;
  }
  const next = (cart[id] || 0) + delta;
  if (next <= 0) {
    delete cart[id];
  } else if (next <= 25) {
    cart[id] = next;
  }
  saveCart(cart);
  return cart;
}

function renderOrder(cart) {
  const items = Object.entries(cart);
  const itemsEl = document.getElementById("checkout-items");
  const payButton = document.getElementById("pay-button");

  if (!items.length) {
    itemsEl.innerHTML = '<p class="checkout-empty">Your cart is empty. <a href="shop.html">Return to the shop</a> to add some honey.</p>';
    payButton.disabled = true;
    document.getElementById("checkout-subtotal").textContent = money(0);
    document.getElementById("checkout-tax").textContent = money(0);
    document.getElementById("checkout-total").textContent = money(0);
    return null;
  }

  const subtotalCents = items.reduce((sum, [id, quantity]) => sum + PRODUCTS[id].priceCents * quantity, 0);
  const taxCents = Math.round((subtotalCents + SHIPPING_CENTS) * SANDBOX_TAX_RATE);
  const totalCents = subtotalCents + SHIPPING_CENTS + taxCents;

  itemsEl.innerHTML = items.map(([id, quantity]) => `
    <div class="checkout-line-item" data-line-item="${id}">
      <img class="checkout-line-item__thumb" src="${PRODUCTS[id].image}" alt="${PRODUCTS[id].name}" loading="lazy" />
      <div class="checkout-line-item__info">
        <span class="checkout-line-item__name">${PRODUCTS[id].name}</span>
        <div class="checkout-line-item__controls">
          <button type="button" data-qty-change="${id}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span aria-live="polite">${quantity}</span>
          <button type="button" data-qty-change="${id}" data-delta="1" aria-label="Increase quantity">+</button>
          <button type="button" class="checkout-line-item__remove" data-remove-item="${id}">Remove</button>
        </div>
      </div>
      <span class="checkout-line-item__price">${money(PRODUCTS[id].priceCents * quantity)}</span>
    </div>
  `).join("");

  document.getElementById("checkout-subtotal").textContent = money(subtotalCents);
  document.getElementById("checkout-tax").textContent = money(taxCents);
  document.getElementById("checkout-total").textContent = money(totalCents);
  return { subtotalCents, taxCents, totalCents };
}

function friendlyPaymentError(error, response) {
  if (response && (response.status === 404 || response.status === 405)) {
    return "This preview site can't take payments yet — the secure payment server isn't connected here. Everything up to this point is exactly how customers will experience it.";
  }
  if (response && response.status === 503) {
    return "The payment server is running but its private Square credential hasn't been added yet, so test cards can't be charged in this environment.";
  }
  if (error instanceof TypeError) {
    return "The payment server couldn't be reached from this preview. The full checkout works once the site is deployed with its secure server.";
  }
  return error.message || "Square could not complete the sandbox order.";
}

async function initializeCheckout() {
  let cart = getCart();
  const message = document.getElementById("checkout-message");
  const payButton = document.getElementById("pay-button");

  document.getElementById("checkout-items").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-item]");
    const qtyButton = event.target.closest("[data-qty-change]");
    if (!removeButton && !qtyButton) {
      return;
    }
    if (removeButton) {
      cart = changeQty(removeButton.dataset.removeItem, -Infinity);
    } else {
      cart = changeQty(qtyButton.dataset.qtyChange, Number(qtyButton.dataset.delta));
    }
    const stillHasItems = renderOrder(cart) !== null;
    payButton.disabled = !stillHasItems || !payButton.dataset.cardReady;
  });

  if (!renderOrder(cart)) {
    return;
  }

  if (!window.Square) {
    message.textContent = "The Square payment form could not load. Check your connection and refresh the page.";
    return;
  }

  try {
    const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
    const card = await payments.card();
    await card.attach("#card-container");
    payButton.disabled = false;
    payButton.dataset.cardReady = "1";

    document.getElementById("checkout-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      cart = getCart();
      if (!Object.keys(cart).length) {
        message.textContent = "Your cart is empty.";
        return;
      }

      payButton.disabled = true;
      message.textContent = "Securing your sandbox payment…";

      let response = null;
      try {
        const tokenResult = await card.tokenize();
        if (tokenResult.status !== "OK") {
          throw new Error("Please check the card information and try again.");
        }

        const formData = new FormData(event.currentTarget);
        const note = String(formData.get("orderNote") || "").trim();
        formData.delete("orderNote");
        const customer = Object.fromEntries(formData.entries());

        response = await fetch("/api/square-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceId: tokenResult.token, cart, customer, note })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result.error || "Square could not complete the sandbox order.");
        }

        localStorage.removeItem(CART_KEY);
        window.location.assign(`order-success.html?order=${encodeURIComponent(result.orderId)}`);
      } catch (error) {
        message.textContent = friendlyPaymentError(error, response);
        payButton.disabled = false;
      }
    });
  } catch {
    message.textContent = "The Square card form could not initialize. This can happen on unsupported browsers — try refreshing, or use Chrome.";
  }
}

window.addEventListener("DOMContentLoaded", initializeCheckout);
