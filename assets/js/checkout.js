const CART_KEY = "ff_cart";
const SQUARE_APPLICATION_ID = "sandbox-sq0idb-NVFEBrBqyL9PTvkW-ocDyA";
const SQUARE_LOCATION_ID = "LG3N4XZKSD2YZ";
const SHIPPING_CENTS = 700;
const SANDBOX_TAX_RATE = 0.0875;

const PRODUCTS = {
  "raw-honey-8oz": {
    name: "She's as Sweet as Can Bee — Raw Honey, 8 oz",
    priceCents: 800,
    image: "assets/img/products/raw-honey-8oz.webp"
  },
  "raw-honey-1lb": {
    name: "She's as Sweet as Can Bee — Raw Honey, 1 lb",
    priceCents: 1300,
    image: "assets/img/products/raw-honey-1lb-wildflower.webp"
  },
  "raw-honey-2-5lb": {
    name: "She's as Sweet as Can Bee — Raw Honey, 2.5 lb",
    priceCents: 2700,
    image: "assets/img/products/raw-honey-2-5lb-wildflower.png"
  },
  "raw-honey-5lb": {
    name: "She's as Sweet as Can Bee — Raw Honey, 5 lb",
    priceCents: 5200,
    image: "assets/img/products/5 lb honey.webp"
  },
  "hot-honey-12oz-skep": {
    name: "She's a Hot Honey — 12 oz Skep Gift Jar",
    priceCents: 1500,
    image: "assets/img/products/hot-honey-12oz-skep.webp"
  },
  "hot-honey-1lb": {
    name: "She's a Hot Honey — 1 lb Jar",
    priceCents: 1600,
    image: "assets/img/products/hot-honey-1lb.webp"
  },
  "hot-honey-8oz": {
    name: "She's a Hot Honey — 8 oz",
    priceCents: 1000,
    image: "assets/img/products/Cherry Bomb hot honey 8 oz.webp"
  },
  "hot-sauce-8oz": {
    name: "She's a Cherry Bomb — Hot Sauce, 8 oz",
    priceCents: 1300,
    image: "assets/img/products/hot-sauce-8oz-full.webp"
  }
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
