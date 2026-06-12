# Marketing UI Kit

The single-page landing site at the apex of the funnel — `amira-fitness.vercel.app/`. Sells the service and routes prospects to either WhatsApp or the multi-step `registro/` intake wizard.

## Surface character

- **Desktop-first**, fully responsive down to 320px.
- **Single long-scroll page** with sticky blurred nav, hero, filosofía (dark green section), how-it-works, services, app preview (dark section), final CTA (gradient section), footer.
- **One inline image** — Amira's portrait at the hero.
- **Two distinct dark sections** punctuate the cream-on-white base — the filosofía and the dark "La app" preview.

## Files in this kit

| File | Purpose |
|---|---|
| `index.html` | Composes the landing page top-to-bottom. |
| `Nav.jsx` | Sticky blurred top nav. |
| `Hero.jsx` | Two-column hero with quote + portrait + CTAs. |
| `Filosofia.jsx` | Dark green "Sobre Amira" section with callout. |
| `Steps.jsx` | "Cómo funciona" 4-step row with numbered circles. |
| `Services.jsx` | "Qué incluye" 3-card grid. |
| `AppPreview.jsx` | Dark section "Tu entrenamiento siempre en el celu". |
| `CTAFinal.jsx` | Gradient verde-d → verde CTA block. |
| `Footer.jsx` | Minimal dark footer. |

## What's recreated vs. omitted

✅ Full page chrome and content sections — fidelity to the production landing.

⚠️ Stripped: GA / Schema.org / OG meta, the WhatsApp deep-link templating, the `/registro/` wizard (linked but not recreated; it lives at the production site).
