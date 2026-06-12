# Amira Fitness — Design System

A design system distilled from **Amira Fitness**, a personalised online training service run by **Amira Lezcano**, an Argentinian personal trainer based in Buenos Aires. The product is built as a small constellation of pages on a single domain — there is no React app, no native binary; everything lives as hand-written HTML/CSS/JS deployed to Vercel and backed by Supabase + CallMeBot for WhatsApp automation.

> *"No soy un bot, no soy un PDF y no soy un gimnasio. Soy una persona que va a conocer tu caso, armar tu plan y estar presente semana a semana para que funcione."* — Amira Lezcano

---

## Sources

This system was extracted from these inputs. The reader does NOT necessarily have access — links are stored for completeness.

- **GitHub:** [github.com/elterco2012-dev/amira-fitness](https://github.com/elterco2012-dev/amira-fitness)
  - `index.html` — marketing landing (24 KB, single file with inline CSS)
  - `alumna/index.html` — the student-facing PWA (157 KB, single file)
  - `panel/index.html` — Amira's admin panel (340 KB, single file)
  - `registro/index.html` — multi-step intake wizard (19 KB)
  - `ficha/index.html`, `bio/index.html` — supporting pages
  - `api/*.svg`, `manifest.json` — PWA assets
  - `MAKE_INSTRUCCIONES.md` — runbook for the WhatsApp automation
- **Production URL:** https://amira-fitness.vercel.app
- **Instagram:** @amirafitnessok
- **WhatsApp:** +54 9 2226 50 0790
- **Photo asset:** `foto-amira.jpg` (hero portrait, used across marketing + app avatar)

> 🔍 **For a deeper recreation**, browse the repo directly — the entire visual language fits in three inline `<style>` blocks (one per surface). Reading them top-to-bottom is the fastest way to ground yourself.

---

## Products in this system

The Amira product line is **three surfaces, one brand**:

| Surface | What it is | Audience | File |
|---|---|---|---|
| **Marketing site** | Landing page + intake wizard. Sells the service, captures leads via WhatsApp or form. | Prospects | `index.html` + `registro/` |
| **Alumna app** | Personal PWA for each student. Today's routine, exercise videos, weight log, progress charts, two-way notes with Amira. Mobile-first (430px max width), installable. | Students | `alumna/index.html` |
| **Panel** | Amira's admin dashboard. CRUD over students, exercise library, week-by-week routine builder, weekly summaries. Desktop-first, sidebar + main layout. | Amira only | `panel/index.html` |

All three share the same green-and-cream palette, DM Sans + DM Serif Display typography, and round-pill button language — but their layout idioms diverge by audience.

---

## Index — what's in this folder

| Path | Purpose |
|---|---|
| `README.md` | This file. |
| `SKILL.md` | Cross-compatible Agent Skill manifest. |
| `colors_and_type.css` | All color + type CSS variables and semantic classes. **Start here.** |
| `assets/` | Brand assets — Amira's portrait, PWA icons, logo SVG. |
| `preview/` | Self-contained HTML cards rendered in the Design System tab. |
| `ui_kits/alumna/` | Recreated alumna (student) PWA — mobile, click-thru. |
| `ui_kits/panel/` | Recreated profesora panel — desktop, click-thru. |
| `ui_kits/marketing/` | Landing-page recreation with hero, services, CTA. |

Fonts are loaded from Google Fonts (no local `.ttf` files exist in the source). No substitution needed — DM Sans and DM Serif Display are pulled from the CDN.

---

## CONTENT FUNDAMENTALS

### Language
**Spanish, Argentinian — "voseo" mandatory.** Verb conjugations are always **second-person singular vos** (*"tenés"*, *"querés"*, *"podés"*, *"escribime"*, *"contale"*), never *tú* or *ustedes*. Subject is informal — Amira speaks to one woman, directly. The product is gendered feminine throughout: *alumna* (never *alumno*), *cada una* (never *cada uno*).

### Voice — "I, the trainer"
Amira writes as herself, first-person. Marketing copy is written **as Amira saying it out loud**, not as third-person sales prose:
- "**Yo** quiero escuchar la tuya."
- "**Trabajo** con pocas alumnas a la vez para poder responderte **yo**, no un bot."
- "**Te armo** tu rutina, **te la ajusto** cada semana."

This is the through-line of the brand: **personal accountability**. There is one human on the other end. Copy explicitly distances itself from automated, generic, or "internet" alternatives.

### Tone
- **Warm, direct, slightly informal.** Not corporate. Not "wellness-coach effusive."
- **Conversational rhythm.** Short sentences. Line breaks for breath. Em-dashes. Comma-separated lists rather than bullets when in prose.
- **No hype.** Avoids superlatives like *"transformá tu cuerpo"* or *"resultados garantizados"*. Instead: *"Rutinas que evolucionan con vos"*, *"Objetivos reales, no ideales de revista"*.
- **Empathetic + no-nonsense.** "Cualquier molestia, avisame enseguida 💪" (sample student note).

### Casing
- **Sentence case everywhere.** Titles, buttons, badges, nav items — only the first word capitalised. *"Cómo funciona"*, *"Quiero empezar"*, *"Tu rutina personalizada"*.
- **No ALL-CAPS** except for tiny uppercase eyebrows ("EL SERVICIO", "SOBRE AMIRA") which use letter-spacing tracking instead.
- **Brand mark** is always *"Amira Fitness"* (two words, both capitalised). Never *AMIRA FITNESS* or *amira fitness*.

### Emoji usage — **deliberate, not decorative**
Emoji are part of the brand voice but used sparingly and contextually:
- Service cards use a single themed emoji per concept: 📋 (routine), 📊 (tracking), 💬 (contact), 🎯 (goals), 🔄 (iteration), 💪 (encouragement)
- WhatsApp templates close with one emoji: 💪, 🌟, 💚
- Onboarding/celebration moments use bigger emoji as imagery (4-5rem)
- **Never** used inside CTAs ("Quiero empezar", not "Quiero empezar 💪") and **never** in the panel's admin UI.

### Specific copy examples
- Hero: **"No quiero darte *otra rutina de internet*. Quiero conocerte y armarte la tuya."** (italics carry the friction; en-dash splits the two halves on mobile)
- Trust strip: **"Cupos limitados · Sin contrato · Respuesta en el día"**
- WhatsApp template: **"Hola María! 💪 Hoy es día de entrenamiento. Tu rutina: ... ¡Vamos que podés! — Amira"**
- Footer: **"Amira Fitness · Entrenamiento personalizado · Buenos Aires, Argentina"** (middle-dot separators, no Oxford comma)
- Empty state on chart: **"Cuando registres pesos, vas a ver tu evolución acá."**

---

## VISUAL FOUNDATIONS

### Color
Anchored on a single **deep, slightly desaturated green** — `#1D9E75`. Not lime, not teal, not forest. A specific botanical green that reads "vital, alive, not corporate." Around it:
- A **cream off-white** (`#f8f8f6`) page background — *never pure white*. Pure white (`#ffffff`) is reserved for cards/surfaces, which sit on cream.
- A small set of **muted secondary tints** (purple `#EEEDFE`, amber `#FAEEDA`, coral `#FAECE7`) used only for: tip/note backgrounds, avatar variations, service-card icon chips. Each tint always pairs with a darker text variant for contrast.
- **No bright reds, no bright yellows**, no neon. Danger uses a muted `#A32D2D`.
- Dark mode flips background to near-black `#111110` and surfaces to `#1c1c1a`. Greens shift to muted-deep variants; tints become dark-versions of themselves. Both surfaces (alumna + panel) ship dark mode and the user can toggle.

### Typography
A two-family system with no exceptions:
- **DM Sans** for body, UI, navigation, buttons, inputs. Weights used: **300, 400, 500**. (No 600+ in production source.)
- **DM Serif Display** for: hero quotes, section titles, big stat numbers, drawer headers, the avatar letter, the timer countdown. Italic variant available — used for emphasis like *"otra rutina de internet"* and for the ornamental opening quotation mark in callout cards.

The display serif is the brand's voice. Every "headline that should land emotionally" gets it.

### Spacing & layout
- **Section vertical padding: `5rem`** on desktop, `3.5rem` on mobile.
- **Max content width: `1100px`** on marketing, `1100px` on panel's inner cards, **`430px`** on alumna (mobile-only).
- **Generous line-height for prose** (1.85) — body copy on dark green sections breathes.
- **Sticky nav** at top of marketing site uses backdrop-filter blur + 93% white background.
- **Bottom-fixed nav** on alumna app (also blurred-white background-style), sticky timer that slides up from below it.

### Background language
- Mostly **flat off-white or pure white**.
- **Dark green sections** (`#0F6E56`) used as content "moments" — the "Sobre Amira" filosofía section and the final CTA. They invert: white text, green-mid eyebrows, rgba(255,255,255,0.08) callout cards.
- **One linear gradient only**, in the CTA: `linear-gradient(135deg, var(--verde-d) 0%, var(--verde) 100%)`. This is the brand's *only* gradient. Resist adding more.
- No textures, no patterns, no hand-drawn illustrations, no full-bleed photography beyond the hero portrait (which is contained inside a 24px-rounded 4:5 aspect frame). No grain, no noise.

### Borders, cards, shadows
- **Card pattern (universal):** `1px solid rgba(0,0,0,0.07)`, `border-radius: 16px`, `background: #fff`, sits on `#f8f8f6` page.
- **Smaller controls** (chips, ex-card, inputs) use `border-radius: 10px`.
- **CTAs and badges** use `border-radius: 30px` (pill).
- **Shadows are nearly absent.** No shadow on cards by default. Hover on service-cards adds `0 4px 20px rgba(0,0,0,0.06)`. The floating timer has a *top* shadow `0 -4px 20px rgba(0,0,0,.08)`. The drawer has a horizontal shadow `-4px 0 40px rgba(0,0,0,.2)`. That's it.
- **Dashed borders** appear in exactly one place: the "no-program day" opt-in CTA on the alumna app (`1px dashed #e5a37e`).

### Iconography (see ICONOGRAPHY below for full rules)
Mostly **emoji as icon**. Some hand-rolled SVG (WhatsApp glyph, nav arrows). No icon font, no Lucide/Heroicons.

### Animation & motion
- Default easing: **`cubic-bezier(.4, 0, .2, 1)`** (a soft material-style ease-out). Used for: tab switches, screen transitions, timer slide-up.
- **Spring/bounce** reserved for **one moment**: the celebration modal pop-in (`cubic-bezier(.34, 1.56, .64, 1)`). The check-pop animation on exercise complete also has bounce.
- Standard durations: 0.15s (hover/tap), 0.2s–0.25s (transitions), 0.35s (slide-up).
- **Specific custom animations** exist for: checking off an exercise (`popCheck` — 4-stop scale), celebration card entrance (`celPop` — scale 0.65→1 with overshoot), ripple on the exercise-number when tapped.

### Hover & press states
- **Hover** lifts colored buttons by `translateY(-1px)` and darkens the background (e.g. `--verde` → `--verde-dark`). Outline buttons fill with their light tint (e.g. `--verde-outline` → `--verde-light` bg).
- **Press** uses `transform: scale(.92–.95)` on tappable elements — the timer circle, feedback chips, the bottom-nav buttons.
- No box-shadow expansion on hover (the visual signature is **lift + color shift**, not glow).

### Transparency & blur
- **Backdrop-filter blur** on: marketing nav (`blur(14px)` over 93% white), nothing else.
- **rgba transparency** used inside dark-green sections: `rgba(255,255,255,0.08)` for callout backgrounds, `rgba(255,255,255,0.15)` for borders, descending opacities (0.45–0.85) for text hierarchy.

### Layout rules — fixed elements
- Marketing nav: `position: sticky; top: 0` (max 1 sticky element).
- Alumna app: sticky `.header` at top, `position: fixed` bottom nav, optional `.timer` bar fixed above bottom nav when active. Order from bottom-up: bottom-nav → timer → content scroll.
- Panel: fixed `230px` sidebar on desktop, hidden under 700px.

### Imagery
- **One real photo asset only:** Amira's portrait (`foto-amira.jpg`). Treated as warm/natural — no filter, no grain, no overlay. Object-position `center 70%` (face-weighted upward).
- **No stock photography.** No imagery of gym equipment, exercising bodies, food, or anything else.
- The brand image is a **single human** — Amira herself. Don't dilute this.

### Vibe summary
**Quiet, warm, personal, careful.** A small studio brand that resists tropes — no gradient backgrounds beyond the one CTA, no neon, no AI-generated illustrations, no "wellness-app glow." Everything looks hand-laid, font-forward, and intimate at 430px wide. The serif italic does the emotional work; the green does the trust work; the cream off-white keeps everything from feeling clinical.

---

## ICONOGRAPHY

The Amira product is **icon-light by design** — there's no Lucide, Heroicons, FontAwesome, Material Symbols, Phosphor, or Feather imported anywhere. The visual rules:

### 1. Emoji as the primary icon system
The product uses platform-native emoji as iconography wherever a small pictogram is needed:
- **Service cards (marketing):** 📋 routine, 📊 tracking, 💬 contact
- **Filosofía pillars:** 🎯 goals, 🔄 iteration, 💬 contact
- **App features:** ✓ checks (text char, not emoji)
- **App preview (PWA):** 📱
- **Bottom nav items (alumna):** mix of emoji + text labels
- **Celebration moments:** 🎉, 💪, 🌟, 💚 at large sizes (3.5–4.5rem)

Because emoji render via the user's OS, this means **the icon style varies** (Apple's are colourful and rounded; Google's flatter; Windows' have outlines). Amira accepts this — the warmth and personal-touch of the brand is *enhanced*, not diluted, by the slight inconsistency. Do not "fix" this by switching to an icon font.

### 2. Hand-rolled SVG — only when necessary
Three places use literal `<svg>`:
- **The WhatsApp glyph** on CTAs (`24x24` viewBox, two-path filled icon, `currentColor`). This is a recognisable trademark; emoji 💬 would be wrong.
- **The play triangle** on the warmup card (CSS-drawn with borders, not SVG).
- **Tiny chevron/triangle decorations** drawn via CSS borders.

Copies of the WhatsApp glyph and the small play triangle are documented in `preview/icons.html`.

### 3. The brand mark
The "A" inside a green-tinted circle, set in **DM Serif Display** at 14–24px. This is the closest thing the brand has to a logo. It appears in:
- The 192×192 / 512×512 PWA icons (`assets/icon-*.svg`)
- The marketing nav (`.nav-logo`)
- The alumna app header (`.hlogo`)
- The panel sidebar (`.logo`)
- The login screen (`.ll`)

The PWA icons are SVG: a green `#1D9E75` rounded rect with a centered white "A" in serif. No wordmark variant exists.

### 4. Unicode characters as icons
A few unicode chars play icon roles:
- **`→`** (right arrow) — used in "completá el formulario · 2 min →" affordances and in nav breadcrumbs.
- **`✓`** check — used as a feature-list marker inside circular green chips.
- **`·`** middle-dot — separator in trust strips and footers (more commonly than commas).

### 5. CDN icon library — **NOT used**
**Do not introduce Lucide/Heroicons/etc. into Amira's UI.** If you need an icon and emoji + the trio above don't cover it:
1. First, ask: "could this be a text label instead?" (Amira's UI prefers labels.)
2. If you truly need a pictogram, use the closest matching emoji.
3. If even emoji won't do, hand-roll a 16–24px SVG in a single `currentColor` stroke or fill, matching the WhatsApp-glyph weight.

**Substitution flag:** No substitution was needed — every icon used in the source is one of (emoji, the WhatsApp SVG, CSS-drawn shape, or unicode char) and has been documented.

---

## Caveats & substitutions

- **No font files were shipped in the source.** Both DM Sans and DM Serif Display load from Google Fonts CDN. The system documents the CDN URLs but does not vendor `.ttf` files. If you need offline builds, fetch them from [Google Fonts](https://fonts.google.com/specimen/DM+Sans) directly.
- **Purple-dark hex inconsistency in source:** the marketing/alumna files use `#3C3289`, the panel uses `#3C3489`. This system normalises to `#3C3289` — the difference is imperceptible.
- **Multi-product, single-codebase.** The product is three static HTML files with shared CSS-variable conventions but no actual shared stylesheet. Variable names also differ slightly (alumna uses `--v`, `--vl`; marketing uses `--verde`, `--verde-l`). This design system unifies them under `--amira-*` names.

---

## How to use this system

Read `colors_and_type.css` for tokens. Look at `preview/` cards for what foundations and components look like. Open `ui_kits/alumna/index.html`, `ui_kits/panel/index.html`, and `ui_kits/marketing/index.html` for the full surface recreations — each is a click-thru that you can pull whole sections from when prototyping new screens.

When making new artefacts, ask: *would Amira say this out loud, this way?* If yes, the copy is on-brand. If it sounds like a product manager wrote it, rewrite.
