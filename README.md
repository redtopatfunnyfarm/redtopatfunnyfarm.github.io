# Shop at Funny Farm Website

This repository contains the public website for Shop at Funny Farm and the in-progress Square ecommerce checkout.

## Current status

- The existing storefront and product gallery remain intact.
- A shopping cart is available on `shop.html`.
- A branded Square sandbox checkout is available on `checkout.html`.
- Flat-rate shipping is currently set to $7.00.
- Sandbox tax is temporarily estimated at 8.75% for Erie County testing.
- The server-side payment function is in `functions/api/square-payment.js`.
- The checkout is still in test mode. It cannot make a real charge.
- No production Square access token is stored in this repository.

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for recovery instructions and the remaining launch checklist.

## Safety rules

- Never commit `.dev.vars`, `.env`, Square access tokens, passwords, or payment information.
- Square secret credentials belong in local environment variables during testing and in encrypted Cloudflare secrets after deployment.
- Product prices, shipping, tax treatment, inventory, and policies must be confirmed with Tammy before launch.

## Local checks

Run:

```text
npm run check
```

For local Cloudflare Pages testing, use Wrangler and provide the sandbox access token as a private environment binding. The example variable name is documented in `.dev.vars.example`; the real value must not be committed.

## Hosting plan

The planned low-cost setup is:

- GitHub for source control and crash recovery
- Cloudflare Pages for the website and server-side payment function
- Square for sandbox testing, payment processing, orders, and the eventual production checkout
