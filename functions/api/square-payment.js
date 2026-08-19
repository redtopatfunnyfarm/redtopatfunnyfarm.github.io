const PRODUCTS = {
  "raw-honey-8oz": { name: "She's as Sweet as Can Bee — Raw Honey, 8 oz", priceCents: 800 },
  "raw-honey-1lb": { name: "She's as Sweet as Can Bee — Raw Honey, 1 lb", priceCents: 1300 },
  "raw-honey-2-5lb": { name: "She's as Sweet as Can Bee — Raw Honey, 2.5 lb", priceCents: 2700 },
  "raw-honey-5lb": { name: "She's as Sweet as Can Bee — Raw Honey, 5 lb", priceCents: 5200 },
  "hot-honey-12oz-skep": { name: "She's a Hot Honey — 12 oz Skep Gift Jar", priceCents: 1500 },
  "hot-honey-1lb": { name: "She's a Hot Honey — 1 lb Jar", priceCents: 1600 },
  "hot-honey-8oz": { name: "She's a Hot Honey — 8 oz", priceCents: 1000 },
  "hot-sauce-8oz": { name: "She's a Cherry Bomb — Hot Sauce, 8 oz", priceCents: 1300 },
  "bee-kissable": { name: "Bee Kissable — Lip Balm", priceCents: 330 },
  "buzzed-bees": { name: "Buzzed Bees — Lip Balm", priceCents: 330 },
  "lip-stuff-for-dudes": { name: "Lip Stuff for Dudes — Lip Balm", priceCents: 330 },
  "sun-of-a-beech-balm": { name: "Sun of a Beech Balm — Lip Balm", priceCents: 440 },
  "blizzard-bee-balm": { name: "Blizzard Bee Balm — Lip Balm", priceCents: 440 },
  "bee-clear": { name: "Bee Clear — Blemish Stick", priceCents: 660 },
  "bee-paws-paw-balm": { name: "Bee Paws — Paw Balm", priceCents: 1100 },
  "cocoa-butter-lotion": { name: "Cocoa Butter Lotion", priceCents: 1430 },
  "honey-almond-lotion": { name: "Honey Almond Lotion", priceCents: 1430 },
  "tea-tree-vinegar-facial-toner": { name: "Tea Tree & Vinegar Facial Toner", priceCents: 1760 },
  "rajeunir-body-mist": { name: "Rajeunir Body Mist", priceCents: 2090 },
  "clearly-beeautiful": { name: "Clearly Beeautiful", priceCents: 2200 },
  "honey-almond-cream": { name: "Honey Almond Cream", priceCents: 2310 },
  "pumpkin-masque": { name: "Pumpkin Masque", priceCents: 2420 },
  "wild-oats-honey-facial-cleanser": { name: "Wild Oats & Honey Facial Cleanser", priceCents: 2640 },
  "aha-mint-walnut-polish": { name: "AHA Mint Walnut Polish", priceCents: 3080 },
  "supreme-facial-serum": { name: "Supreme Facial Serum with DMAE", priceCents: 3300 },
  "vector-lift-creme": { name: "Vector Lift Creme", priceCents: 3300 },
  "herbal-spa-hair-body-wash": { name: "Herbal Spa Hair & Body Wash", priceCents: 1980 },
  "bath-body-essentials-kit": { name: "Bath & Body Essentials Kit", priceCents: 5610 },
  "skin-care-starter-kit": { name: "Skin Care Essentials Starter Kit", priceCents: 6820 }
};

const LOCATION_ID = "LG3N4XZKSD2YZ";
const SHIPPING_CENTS = 700;
const SANDBOX_TAX_PERCENTAGE = "8.75";
const SQUARE_VERSION = "2026-01-22";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}

function validateCart(rawCart) {
  if (!rawCart || typeof rawCart !== "object" || Array.isArray(rawCart)) {
    throw new Error("Your cart is invalid.");
  }

  const entries = Object.entries(rawCart).map(([id, quantity]) => {
    if (!PRODUCTS[id] || !Number.isInteger(quantity) || quantity < 1 || quantity > 25) {
      throw new Error("Your cart contains an invalid product or quantity.");
    }
    return { id, quantity, ...PRODUCTS[id] };
  });

  if (!entries.length || entries.length > 40) {
    throw new Error("Your cart must contain between 1 and 40 products.");
  }
  return entries;
}

function validateCustomer(customer) {
  const required = ["name", "email", "addressLine1", "city", "state", "postalCode"];
  if (!customer || required.some((field) => !String(customer[field] || "").trim())) {
    throw new Error("Please complete the required shipping fields.");
  }

  const clean = Object.fromEntries(Object.entries(customer).map(([key, value]) => [key, String(value || "").trim().slice(0, 200)]));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!/^[A-Za-z]{2}$/.test(clean.state)) {
    throw new Error("Please use a two-letter state abbreviation.");
  }
  return clean;
}

async function squareRequest(path, token, body) {
  const response = await fetch(`https://connect.squareupsandbox.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      "Content-Type": "application/json",
      "Square-Version": SQUARE_VERSION
    },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    data = {};
  }
  if (!response.ok) {
    console.error(`Square ${response.status} on ${path}: ${text.slice(0, 1000)}`);
    const detail = data.errors ? JSON.stringify(data.errors).slice(0, 300) : text.slice(0, 300);
    throw new Error(`Square sandbox error (HTTP ${response.status} on ${path})${detail ? `: ${detail}` : ""}`);
  }
  return data;
}

export async function onRequestPost({ request, env }) {
  if (!env.SQUARE_SANDBOX_ACCESS_TOKEN) {
    return json({ error: "Square sandbox is not connected to the server yet." }, 503);
  }

  try {
    const payload = await request.json();
    if (!payload.sourceId || typeof payload.sourceId !== "string") {
      throw new Error("The Square payment token is missing.");
    }

    const items = validateCart(payload.cart);
    const customer = validateCustomer(payload.customer);
    const orderNote = String(payload.note || "").trim().slice(0, 500);
    const idempotencyKey = crypto.randomUUID();
    const orderResult = await squareRequest("/v2/orders", env.SQUARE_SANDBOX_ACCESS_TOKEN, {
      idempotency_key: idempotencyKey,
      order: {
        location_id: LOCATION_ID,
        reference_id: `web-${idempotencyKey}`,
        source: { name: "Funny Farm website sandbox" },
        line_items: items.map((item) => ({
          name: item.name,
          quantity: String(item.quantity),
          base_price_money: { amount: item.priceCents, currency: "USD" }
        })),
        service_charges: [{
          name: "Flat-rate shipping",
          amount_money: { amount: SHIPPING_CENTS, currency: "USD" },
          calculation_phase: "SUBTOTAL_PHASE",
          taxable: true
        }],
        taxes: [{
          name: "Erie County tax — sandbox estimate",
          percentage: SANDBOX_TAX_PERCENTAGE,
          scope: "ORDER"
        }],
        fulfillments: [{
          type: "SHIPMENT",
          state: "PROPOSED",
          shipment_details: {
            recipient: {
              display_name: customer.name,
              email_address: customer.email,
              phone_number: customer.phone || undefined,
              address: {
                address_line_1: customer.addressLine1,
                address_line_2: customer.addressLine2 || undefined,
                locality: customer.city,
                administrative_district_level_1: customer.state.toUpperCase(),
                postal_code: customer.postalCode,
                country: "US"
              }
            }
          }
        }]
      }
    });

    const order = orderResult.order;
    const paymentResult = await squareRequest("/v2/payments", env.SQUARE_SANDBOX_ACCESS_TOKEN, {
      source_id: payload.sourceId,
      idempotency_key: crypto.randomUUID(),
      amount_money: order.total_money,
      order_id: order.id,
      location_id: LOCATION_ID,
      buyer_email_address: customer.email,
      note: orderNote ? `Website sandbox order — ${orderNote}` : "Shop at Funny Farm website sandbox order"
    });

    return json({ orderId: order.id, paymentId: paymentResult.payment.id });
  } catch (error) {
    return json({ error: error.message || "The sandbox order could not be completed." }, 400);
  }
}
