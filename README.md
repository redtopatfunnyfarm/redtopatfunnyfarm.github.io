# Shop at Funny Farm — shopatfunnyfarm.com

The ecommerce website for Funny Farm LLC (Tammi Meidenbauer, Corfu NY): raw honey, hot
honey, hot sauce, lip balms, and skincare. Custom static site + Square checkout.

## Live setup

- **Production URL:** https://www.shopatfunnyfarm.com (apex 301-redirects to www)
- **Hosting:** Cloudflare Pages project `redtopatfunnyfarm` — serves the site AND runs the
  Square payment function (`functions/api/square-payment.js`)
- **DNS/domain:** stays at GoDaddy (Tammi's account); `www` CNAME → redtopatfunnyfarm.pages.dev,
  apex forwarded. Email/Microsoft DNS records intentionally untouched.
- **Source/backup:** this GitHub repo (`redtopatfunnyfarm.github.io` also serves a static
  mirror without the payment API)
- **Payments:** Square **sandbox** — test card 4111 1111 1111 1111, any future exp, CVV 111.
  No real charges possible until production credentials are swapped in.

## Current state (Aug 18, 2026)

- 32-product catalog in 7 categories, rendered from one source: `assets/js/shop.js`
  (`CATALOG`). Prices: honey/hot lines confirmed by Tammi's 3/5/26 list; original
  lip balm/skincare lines at 2019 prices +10% pending her confirmation.
- Every product has an image: real photos, tube crops from her 2018 line photo
  (`balm-*.jpg`), or branded concept mockups (`mock-*.jpg`, marked "Concept image").
- Checkout: cart drawer, editable line items, order note → Square payment note, sandbox
  test-card hint, friendly failure messages. Verified end-to-end repeatedly.
- Mobile-optimized: chatbot is a tap-to-open mascot bubble, 2-column shop grid on phones,
  44px-class tap targets, no horizontal scroll on any page.
- Assets are cache-busted (`?v=YYYYMMDDx`) — **bump the version in all HTML files whenever
  CSS/JS changes**, or phones will serve stale files.

## Catalog editing

The price list lives in THREE places that must stay in sync:
1. `assets/js/shop.js` — display catalog (names, prices, images, blurbs, categories)
2. `assets/js/checkout.js` — checkout PRODUCTS map (priceCents + image)
3. `functions/api/square-payment.js` — server-side price validation (priceCents)

## Deploying

```text
npm run check                 # syntax checks
```

Deploy from a CLEAN copy of tracked files only (the repo folder contains private
`content-from-tammi/` which must never be uploaded):

```text
git archive HEAD | tar -x -C <temp dir>
npx wrangler pages deploy <temp dir> --project-name redtopatfunnyfarm --branch main --commit-dirty=true
```

Pushing to `main` also updates the GitHub Pages mirror automatically.

## Safety rules

- Never commit `.dev.vars`, `.env`, Square tokens, passwords, or payment data.
- The Square sandbox token lives ONLY as an encrypted Cloudflare Pages secret
  (`SQUARE_SANDBOX_ACCESS_TOKEN`). Rotate/replace it via the Cloudflare dashboard.
- `content-from-tammi/` and `AUDIT-*.md` are gitignored — private source material.

## Remaining to true production

See PROJECT_STATUS.md for the full runbook. Short version: Tammi confirms prices/stock,
swap sandbox → production Square credentials, real destination-based NY tax, her
sign-off, and enable domain auto-renew at GoDaddy (expires Nov 21, 2026!).
