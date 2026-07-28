const PRODUCTS = {
  "raw-honey-1lb": { name: "Raw Honey — 1 lb (Seasonal)", priceCents: 1400 },
  "raw-honey-2-5lb": { name: "Raw Honey — 2.5 lb", priceCents: 2800 },
  "raw-honey-5lb": { name: "Raw Honey — 5 lb", priceCents: 5200 },
  "cherry-bomb-hot-honey-8oz": { name: "Cherry Bomb Hot Honey — 8 oz", priceCents: 1000 },
  "cherry-bomb-hot-sauce-8oz": { name: "Cherry Bomb Hot Sauce — 8 oz", priceCents: 1200 }
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

  if (!entries.length || entries.length > 20) {
    throw new Error("Your cart must contain between 1 and 20 products.");
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
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Square-Version": SQUARE_VERSION
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errors?.[0]?.detail || "Square rejected the sandbox request.");
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
          calculation_phase: "SUBTOTAL",
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
      note: "Shop at Funny Farm website sandbox order"
    });

    return json({ orderId: order.id, paymentId: paymentResult.payment.id });
  } catch (error) {
    return json({ error: error.message || "The sandbox order could not be completed." }, 400);
  }
}
