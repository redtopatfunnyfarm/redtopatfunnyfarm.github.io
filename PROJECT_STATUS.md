# Project Status and Recovery Notes

Last updated: July 28, 2026

## Business goal

Create a low-monthly-cost ecommerce website for Tammy's small honey and hot-sauce business. Expected online volume is approximately 20 to 100 orders per month. Orders will be shipped. The current website should keep its existing visual identity while providing a smooth cart and checkout experience.

## Decisions made

- Keep the existing custom website instead of rebuilding it in Squarespace, Shopify, or Square Online.
- Use Square for payments and order creation.
- Use Cloudflare Pages for the static website and the small secure server function needed by Square.
- Use GitHub as the permanent source and backup.
- Start with flat-rate shipping of $7.00.
- Use the products and prices already shown on the website as temporary test data.
- Treat the current 8.75% Erie County tax calculation as a sandbox estimate only.

## Square configuration completed

- Square developer application name: `redtopatfunnyfarm`
- Production application ID: `sq0idp-uV8cbKahLhzaO5oBH0CN0w`
- Sandbox application ID: `sandbox-sq0idb-NVFEBrBqyL9PTvkW-ocDyA`
- Sandbox location ID: `LG3N4XZKSD2YZ`

Application IDs and location IDs are public configuration values. Access tokens are private secrets and are intentionally excluded from this repository.

## Website work completed

- Updated `shop.html` with a secure test-checkout path and $7 shipping disclosure.
- Added `checkout.html` with matching branding, shipping fields, totals, and the Square sandbox card container.
- Added `assets/js/checkout.js` to initialize Square Web Payments and submit a tokenized sandbox payment.
- Added `functions/api/square-payment.js` to validate prices on the server, create a Square order, and request payment.
- Added `order-success.html` for successful sandbox orders.
- Added `.gitignore` protections for private environment files.
- Added `.dev.vars.example` containing only a safe placeholder.
- Added syntax checks through `package.json`.
- Added checkout styling to `assets/css/styles.css`.

## Temporary product catalog

| Product | Test price |
| --- | ---: |
| Raw Honey — 1 lb (Seasonal) | $14.00 |
| Raw Honey — 2.5 lb | $28.00 |
| Raw Honey — 5 lb | $52.00 |
| Cherry Bomb Hot Honey — 8 oz | $10.00 |
| Cherry Bomb Hot Sauce — 8 oz | $12.00 |

These products and prices must be confirmed with Tammy before launch.

## Verified behavior

- A product can be added to the cart.
- The cart carries the product into checkout.
- A $14.00 product displays $7.00 shipping, $1.84 temporary sandbox tax, and a $22.84 estimated total.
- JavaScript syntax checks pass.
- The private sandbox token was copied from Square without being displayed in chat or written to tracked files.

The Square card form still needs a successful end-to-end sandbox test. The most recent local attempt reached checkout, but the card component remained unavailable. This needs diagnosis before deployment; it may relate to the Square sandbox configuration, browser SDK initialization, or the temporary local environment.

## Next steps

1. Diagnose and complete the Square sandbox card-form initialization.
2. Run one complete sandbox order with Square's official test card data.
3. Confirm the order appears in Square's sandbox dashboard.
4. Ask Tammy to confirm product names, prices, photos, available quantities, and which products can be shipped.
5. Confirm the legal shipping address, customer-service contact details, return/refund policy, privacy policy, and terms.
6. Replace the temporary Erie County tax estimate with destination-based production tax handling and confirm Tammy's registrations with her tax professional.
7. Create or connect the Cloudflare Pages project.
8. Store the Square token as an encrypted Cloudflare secret—never in GitHub.
9. Connect the final domain and test the entire mobile and desktop customer journey.
10. Obtain Tammy's approval before switching from sandbox to production.

## Crash recovery

1. Open this repository folder.
2. Review `git status` and the latest Git commit.
3. Read this file before changing Square or Cloudflare settings.
4. Run `npm run check`.
5. Obtain a fresh sandbox token from Square only if needed. Never paste it into chat or commit it.

If the local computer is lost, clone the GitHub repository again. Private Square and Cloudflare secrets must be restored through their official dashboards because GitHub intentionally does not contain them.
