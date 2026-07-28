const CART_KEY = "ff_cart";
const SQUARE_APPLICATION_ID = "sandbox-sq0idb-NVFEBrBqyL9PTvkW-ocDyA";
const SQUARE_LOCATION_ID = "LG3N4XZKSD2YZ";
const SHIPPING_CENTS = 700;
const SANDBOX_TAX_RATE = 0.0875;

const PRODUCTS = {
  "raw-honey-1lb": { name: "Raw Honey — 1 lb (Seasonal)", priceCents: 1400 },
  "raw-honey-2-5lb": { name: "Raw Honey — 2.5 lb", priceCents: 2800 },
  "raw-honey-5lb": { name: "Raw Honey — 5 lb", priceCents: 5200 },
  "cherry-bomb-hot-honey-8oz": { name: "Cherry Bomb Hot Honey — 8 oz", priceCents: 1000 },
  "cherry-bomb-hot-sauce-8oz": { name: "Cherry Bomb Hot Sauce — 8 oz", priceCents: 1200 }
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

function renderOrder(cart) {
  const items = Object.entries(cart);
  const itemsEl = document.getElementById("checkout-items");
  const payButton = document.getElementById("pay-button");

  if (!items.length) {
    itemsEl.innerHTML = '<p>Your cart is empty. <a href="shop.html">Return to the shop</a>.</p>';
    payButton.disabled = true;
    return null;
  }

  const subtotalCents = items.reduce((sum, [id, quantity]) => sum + PRODUCTS[id].priceCents * quantity, 0);
  const taxCents = Math.round((subtotalCents + SHIPPING_CENTS) * SANDBOX_TAX_RATE);
  const totalCents = subtotalCents + SHIPPING_CENTS + taxCents;

  itemsEl.innerHTML = items.map(([id, quantity]) => `
    <div class="checkout-line-item">
      <span>${PRODUCTS[id].name} <strong>× ${quantity}</strong></span>
      <span>${money(PRODUCTS[id].priceCents * quantity)}</span>
    </div>
  `).join("");

  document.getElementById("checkout-subtotal").textContent = money(subtotalCents);
  document.getElementById("checkout-tax").textContent = money(taxCents);
  document.getElementById("checkout-total").textContent = money(totalCents);
  return { subtotalCents, taxCents, totalCents };
}

async function initializeCheckout() {
  const cart = getCart();
  if (!renderOrder(cart) || !window.Square) {
    return;
  }

  const message = document.getElementById("checkout-message");
  const payButton = document.getElementById("pay-button");

  try {
    const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
    const card = await payments.card();
    await card.attach("#card-container");
    payButton.disabled = false;

    document.getElementById("checkout-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      payButton.disabled = true;
      message.textContent = "Securing your sandbox payment…";

      try {
        const tokenResult = await card.tokenize();
        if (tokenResult.status !== "OK") {
          throw new Error("Please check the card information and try again.");
        }

        const customer = Object.fromEntries(new FormData(event.currentTarget).entries());
        const response = await fetch("/api/square-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceId: tokenResult.token, cart, customer })
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Square could not complete the sandbox order.");
        }

        localStorage.removeItem(CART_KEY);
        window.location.assign(`order-success.html?order=${encodeURIComponent(result.orderId)}`);
      } catch (error) {
        message.textContent = error.message;
        payButton.disabled = false;
      }
    });
  } catch {
    message.textContent = "Sandbox checkout needs its private Square server credential before test payments can run.";
  }
}

window.addEventListener("DOMContentLoaded", initializeCheckout);
