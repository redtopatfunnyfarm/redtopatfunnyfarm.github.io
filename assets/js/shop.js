const CART_KEY = "ff_cart";

const PRODUCTS = {
  "raw-honey-1lb": {
    id: "raw-honey-1lb",
    name: "Raw Honey — 1 lb (Seasonal)",
    price: 14,
    image: "assets/img/products/1 lb fall.webp"
  },
  "raw-honey-2-5lb": {
    id: "raw-honey-2-5lb",
    name: "Raw Honey — 2.5 lb",
    price: 28,
    image: "assets/img/products/2.5 fall.webp"
  },
  "raw-honey-5lb": {
    id: "raw-honey-5lb",
    name: "Raw Honey — 5 lb",
    price: 52,
    image: "assets/img/products/5 lb honey.webp"
  },
  "cherry-bomb-hot-honey-8oz": {
    id: "cherry-bomb-hot-honey-8oz",
    name: "Cherry Bomb Hot Honey — 8 oz",
    price: 10,
    image: "assets/img/products/Cherry Bomb hot honey 8 oz.webp"
  },
  "cherry-bomb-hot-sauce-8oz": {
    id: "cherry-bomb-hot-sauce-8oz",
    name: "Cherry Bomb Hot Sauce — 8 oz",
    price: 12,
    image: "assets/img/products/hot sauce partial.webp"
  }
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
    return;
  }

  const cart = loadCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  renderCart();
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
          <img class="cart-item__thumb" src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="cart-item__details">
            <h3>${product.name}</h3>
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

function bindEvents() {
  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.addToCart);
    });
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
      closeCart();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderCart();
});
