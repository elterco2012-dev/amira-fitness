---
name: amira-fitness-design
description: Use this skill to generate well-branded interfaces and assets for Amira Fitness, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

The skill bundles:
- `colors_and_type.css` — full design-token system (CSS variables + semantic classes for type)
- `assets/` — brand assets (Amira's portrait, PWA icons, logo SVG)
- `preview/` — small reference cards showing how foundations and components look
- `ui_kits/alumna/` — recreated mobile PWA for students (React/JSX, click-thru)
- `ui_kits/panel/` — recreated desktop admin for Amira (React/JSX, click-thru)
- `ui_kits/marketing/` — recreated landing page (React/JSX)

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. The fastest path:
1. Copy `colors_and_type.css` + relevant `assets/*` into your output folder.
2. Lift JSX components from a UI kit you need.
3. Compose using the documented design tokens — never invent new colors, radii, or shadows.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, surface, mobile or desktop, voice direction), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Critical brand rules** (re-read these every time):
- Voice is Argentinian Spanish, voseo, first-person ("yo"), conversational and warm — never corporate, never hype.
- Two fonts only: **DM Serif Display** for emotional headlines and big numbers; **DM Sans** for everything else (weights 300/400/500).
- Primary color is `#1D9E75` (verde). Cream `#f8f8f6` is the page bg — *never pure white*.
- Emoji as iconography, hand-rolled SVG for the WhatsApp glyph only. No icon font.
- Three radii: `10/16/30px`. Section vertical padding: `5rem` desktop, `3.5rem` mobile.
- Only one gradient exists — the final-CTA `135deg verde-d → verde`. Don't add more.
- Shadows are sparse — see the shadows preview card for the five allowed.
