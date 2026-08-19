// ============================================================
// SITE CONFIG — the one switch that matters
//
// FF_SHOP_OPEN = false  → "Harvest season" mode:
//   no prices, no cart, no checkout, no order-by-phone prompts.
//   The catalog shows as a coming-soon preview.
//
// FF_SHOP_OPEN = true   → full store: cart, checkout, prices.
//
// To reopen the shop: set this to true and bump the ?v= version
// in every HTML file, then deploy. That's the whole procedure.
// ============================================================
window.FF_SHOP_OPEN = false;
