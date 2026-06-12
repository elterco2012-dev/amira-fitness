# DESIGN SYSTEM — AMIRA FITNESS

> **Documento maestro de migración.** Fuente única de verdad del sistema de diseño de Amira Fitness. Autosuficiente y portable: contiene todos los tokens, el inventario completo de componentes con código, las guías de uso, y un prompt de reconstrucción listo para pegar en otra instancia de Claude Design.
>
> **Producto:** Amira Fitness — entrenamiento personal online de Amira Lezcano (Buenos Aires, Argentina). Tres superficies: marketing (landing + registro), app de la alumna (PWA mobile), panel de la profesora (admin desktop).
>
> **Versión del documento:** migración · junio 2026
> **Fuente original:** `github.com/elterco2012-dev/amira-fitness`

---

## TABLA DE CONTENIDOS

1. [Tokens de diseño](#1-tokens-de-diseño)
   - 1.1 [Colores (JSON)](#11-colores--json)
   - 1.2 [Colores (CSS)](#12-colores--variables-css)
   - 1.3 [Dark mode](#13-dark-mode)
   - 1.4 [Tipografía (JSON)](#14-tipografía--json)
   - 1.5 [Tipografía (CSS)](#15-tipografía--variables-css)
   - 1.6 [Espaciado, radios, sombras, breakpoints (JSON)](#16-espaciado-radios-sombras-breakpoints--json)
   - 1.7 [Espaciado, radios, sombras (CSS)](#17-espaciado-radios-sombras--variables-css)
   - 1.8 [Motion](#18-motion)
2. [Inventario de componentes](#2-inventario-de-componentes)
3. [Guías de uso](#3-guías-de-uso)
4. [Instrucciones de reconstrucción (prompt)](#4-instrucciones-de-reconstrucción)

---

# 1. TOKENS DE DISEÑO

El sistema usa dos convenciones de nombres en producción (el original):
- **App + panel:** variables cortas — `--v`, `--vl`, `--s`, `--t`, `--bm`, etc.
- **Marketing + design system:** variables largas — `--verde`, `--amira-verde`, etc.

Este documento las unifica. La tabla de equivalencia está al final de la sección 1.7.

---

## 1.1 Colores — JSON

```json
{
  "color": {
    "primary": {
      "verde":        { "value": "#1D9E75", "desc": "Verde marca primario. CTAs, logo, success, marca." },
      "verde-light":  { "value": "#E1F5EE", "desc": "Fondo tintado, badges, avatares, fondos de tip." },
      "verde-mid":    { "value": "#5DCAA5", "desc": "Hover/secundario sobre secciones oscuras." },
      "verde-dark":   { "value": "#0F6E56", "desc": "Pressed, texto sobre verde claro, secciones oscuras." }
    },
    "accent": {
      "purple":       { "value": "#EEEDFE", "desc": "Tips, info, avatares decorativos." },
      "purple-dark":  { "value": "#3C3289", "desc": "Texto sobre purple. (panel original usa #3C3489)." },
      "amber":        { "value": "#FAEEDA", "desc": "Warmup card, notas de ejercicio, botón warn." },
      "amber-dark":   { "value": "#633806", "desc": "Texto sobre amber." },
      "coral-light":  { "value": "#FAECE7", "desc": "Avatar coral decorativo." },
      "coral-dark":   { "value": "#712B13", "desc": "Texto sobre coral." }
    },
    "semantic": {
      "success":      { "value": "#1D9E75", "bg": "#E1F5EE", "text": "#0F6E56" },
      "warning":      { "value": "#E5A37E", "bg": "#FDF0E8", "text": "#C06030", "desc": "Borde dashed del CTA día sin programa." },
      "danger":       { "value": "#A32D2D", "bg": "#FCEBEB", "text": "#A32D2D", "desc": "Destructivo, errores, chip de video." },
      "info":         { "value": "#3C3289", "bg": "#EEEDFE", "text": "#3C3289" }
    },
    "neutral": {
      "bg":        { "value": "#f8f8f6", "desc": "Fondo de página — crema cálido, NUNCA blanco puro." },
      "surface":   { "value": "#ffffff", "desc": "Cards, sheets, nav." },
      "surface-2": { "value": "#f3f4f2", "desc": "Inputs, superficie hundida." },
      "surface-3": { "value": "#ebebea", "desc": "Panel: secciones más hundidas." },
      "fg":        { "value": "#1a1a1a", "desc": "Texto primario." },
      "fg-muted":  { "value": "#6b7280", "desc": "Texto secundario, meta." },
      "fg-hint":   { "value": "#9ca3af", "desc": "Placeholder, terciario." },
      "border":        { "value": "rgba(0,0,0,0.07)", "desc": "Hairline por defecto de cards." },
      "border-strong": { "value": "rgba(0,0,0,0.12)", "desc": "Bordes de inputs y controles." }
    },
    "channel": {
      "whatsapp":       { "value": "#25D366" },
      "whatsapp-hover": { "value": "#1da851" }
    }
  }
}
```

---

## 1.2 Colores — variables CSS

```css
:root {
  /* Primary (Verde) */
  --amira-verde:        #1D9E75;
  --amira-verde-light:  #E1F5EE;
  --amira-verde-mid:    #5DCAA5;
  --amira-verde-dark:   #0F6E56;

  /* Accents */
  --amira-purple:       #EEEDFE;
  --amira-purple-dark:  #3C3289;
  --amira-amber:        #FAEEDA;
  --amira-amber-dark:   #633806;
  --amira-coral-light:  #FAECE7;
  --amira-coral-dark:   #712B13;

  /* Semantic */
  --amira-success:      #1D9E75;  --amira-success-bg: #E1F5EE;  --amira-success-text: #0F6E56;
  --amira-warning:      #E5A37E;  --amira-warning-bg: #FDF0E8;  --amira-warning-text: #C06030;
  --amira-danger:       #A32D2D;  --amira-danger-bg:  #FCEBEB;  --amira-danger-text:  #A32D2D;
  --amira-info:         #3C3289;  --amira-info-bg:    #EEEDFE;  --amira-info-text:    #3C3289;

  /* Neutrals */
  --amira-bg:        #f8f8f6;
  --amira-surface:   #ffffff;
  --amira-surface-2: #f3f4f2;
  --amira-surface-3: #ebebea;
  --amira-fg:        #1a1a1a;
  --amira-fg-muted:  #6b7280;
  --amira-fg-hint:   #9ca3af;
  --amira-border:        rgba(0,0,0,0.07);
  --amira-border-strong: rgba(0,0,0,0.12);

  /* Channels */
  --amira-whatsapp:       #25D366;
  --amira-whatsapp-hover: #1da851;
}
```

### Equivalencia con las variables cortas de producción (app + panel)

```css
:root {
  --v:#1D9E75;  --vl:#E1F5EE;  --vm:#5DCAA5;  --vd:#0F6E56;
  --p:#EEEDFE;  --pd:#3C3289;  /* panel original: #3C3489 */
  --a:#FAEEDA;  --ad:#633806;
  --co:#FAECE7; --cod:#712B13;
  --rl:#FCEBEB; --rd:#A32D2D;
  --bg:#f8f8f6; --s:#fff; --s2:#f3f4f2; --s3:#ebebea;
  --t:#1a1a1a;  --tm:#6b7280;  --th:#9ca3af;
  --b:rgba(0,0,0,0.07); --bm:rgba(0,0,0,0.12);
}
```

---

## 1.3 Dark mode

Ambas superficies (app + panel) soportan dark mode vía `data-theme="dark"` en `<html>`. Solo se overridean neutrales y se atenúan los tints; el verde primario `#1D9E75` NO cambia.

```css
[data-theme="dark"] {
  --amira-bg:        #111110;   /* --bg */
  --amira-surface:   #1c1c1a;   /* --s  */
  --amira-surface-2: #242422;   /* --s2 */
  --amira-surface-3: #2e2e2b;   /* --s3 */

  --amira-fg:        #f0ede8;   /* --t  */
  --amira-fg-muted:  #9ca3af;   /* --tm */
  --amira-fg-hint:   #6b7280;   /* --th */

  --amira-border:        rgba(255,255,255,0.07);  /* --b  */
  --amira-border-strong: rgba(255,255,255,0.12);  /* --bm */

  --amira-verde-light:  #0a2e20;  /* --vl */
  --amira-verde-mid:    #1a6b50;  /* --vm */
  --amira-purple:       #1e1c3a;  /* --p  */
  --amira-purple-dark:  #a5a0e8;  /* --pd */
  --amira-amber:        #2a200a;  /* --a  */
  --amira-amber-dark:   #d4a854;  /* --ad */
  --amira-danger-bg:    #2a1010;  /* --rl */
  --amira-danger-text:  #f09595;  /* --rd */
}
```

---

## 1.4 Tipografía — JSON

```json
{
  "font": {
    "family": {
      "sans":    { "value": "'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif", "weights": [300, 400, 500, 600], "desc": "Body, UI, nav, botones, inputs." },
      "display": { "value": "'DM Serif Display', Georgia, serif", "weights": [400], "italic": true, "desc": "Headlines emocionales, números grandes, marca." }
    },
    "size": {
      "display-1": { "value": "2.6rem",   "px": 41.6, "lh": 1.15, "font": "display", "use": "Hero quote, CTA final title." },
      "display-2": { "value": "2.3rem",   "px": 36.8, "lh": 1.2,  "font": "display", "use": "Section title." },
      "display-3": { "value": "1.6rem",   "px": 25.6, "lh": 1.25, "font": "display", "use": "Card/page/login title." },
      "display-4": { "value": "1.3rem",   "px": 20.8, "lh": 1.3,  "font": "display", "use": "Drawer header, modal title." },
      "body-lg":   { "value": "0.975rem", "px": 15.6, "lh": 1.85, "font": "sans",    "use": "Hero desc, section subtitle." },
      "body":      { "value": "0.875rem", "px": 14,   "lh": 1.6,  "font": "sans",    "use": "Body por defecto." },
      "body-sm":   { "value": "0.8125rem","px": 13,   "lh": 1.6,  "font": "sans",    "use": "Botones, texto secundario." },
      "body-xs":   { "value": "0.75rem",  "px": 12,   "lh": 1.5,  "font": "sans",    "use": "Meta, captions, helper." },
      "body-xxs":  { "value": "0.6875rem","px": 11,   "lh": 1.5,  "font": "sans",    "use": "Badge text, table meta." },
      "body-tiny": { "value": "0.625rem", "px": 10,   "lh": 1.4,  "font": "sans",    "use": "Eyebrows uppercase." }
    },
    "weight": { "light": 300, "regular": 400, "medium": 500, "semibold": 600 },
    "lineHeight": { "tight": 1.15, "snug": 1.4, "base": 1.6, "relax": 1.85 },
    "eyebrow": { "size": "0.6875rem", "weight": 500, "tracking": "0.1em", "transform": "uppercase", "color": "verde" }
  }
}
```

**Fuentes:** ambas de Google Fonts (no hay `.ttf` vendoreados).
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

---

## 1.5 Tipografía — variables CSS + clases semánticas

```css
:root {
  --amira-font-sans:    'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --amira-font-display: 'DM Serif Display', Georgia, serif;

  --amira-display-1: 2.6rem;
  --amira-display-2: 2.3rem;
  --amira-display-3: 1.6rem;
  --amira-display-4: 1.3rem;

  --amira-body-lg:   0.975rem;
  --amira-body:      0.875rem;
  --amira-body-sm:   0.8125rem;
  --amira-body-xs:   0.75rem;
  --amira-body-xxs:  0.6875rem;
  --amira-body-tiny: 0.625rem;

  --amira-lh-tight: 1.15;
  --amira-lh-snug:  1.4;
  --amira-lh-base:  1.6;
  --amira-lh-relax: 1.85;

  --amira-eyebrow-size: 0.6875rem;
  --amira-eyebrow-tracking: 0.1em;
}

/* Clases semánticas */
.amira-h1 { font-family: var(--amira-font-display); font-size: var(--amira-display-1); line-height: var(--amira-lh-tight); color: var(--amira-fg); font-weight: 400; }
.amira-h1 em { font-style: italic; color: var(--amira-verde); }
.amira-h2 { font-family: var(--amira-font-display); font-size: var(--amira-display-2); line-height: 1.2; color: var(--amira-fg); font-weight: 400; }
.amira-h3 { font-family: var(--amira-font-display); font-size: var(--amira-display-3); line-height: 1.25; color: var(--amira-fg); font-weight: 400; }
.amira-h4 { font-family: var(--amira-font-sans); font-size: 0.9375rem; font-weight: 500; color: var(--amira-fg); }
.amira-eyebrow { font-family: var(--amira-font-sans); font-size: var(--amira-eyebrow-size); font-weight: 500; color: var(--amira-verde); text-transform: uppercase; letter-spacing: var(--amira-eyebrow-tracking); display: block; }
.amira-body { font-family: var(--amira-font-sans); font-size: var(--amira-body); line-height: var(--amira-lh-base); color: var(--amira-fg); }
.amira-body-lg { font-family: var(--amira-font-sans); font-size: var(--amira-body-lg); line-height: var(--amira-lh-relax); color: var(--amira-fg-muted); }
.amira-meta { font-family: var(--amira-font-sans); font-size: var(--amira-body-xs); color: var(--amira-fg-muted); }
.amira-caption { font-family: var(--amira-font-sans); font-size: var(--amira-body-xxs); color: var(--amira-fg-hint); }
.amira-quote { font-family: var(--amira-font-display); font-style: italic; font-size: var(--amira-display-2); line-height: 1.3; color: var(--amira-fg); }
.amira-num { font-family: var(--amira-font-display); font-size: 2rem; line-height: 1; color: var(--amira-fg); }
.amira-num.success { color: var(--amira-verde-dark); }
```

---

## 1.6 Espaciado, radios, sombras, breakpoints — JSON

```json
{
  "spacing": {
    "1": "0.25rem", "2": "0.5rem", "3": "0.75rem", "4": "1rem",
    "5": "1.25rem", "6": "1.5rem", "8": "2rem", "10": "2.5rem",
    "12": "3rem", "16": "5rem",
    "_notes": "Section vertical padding = 5rem desktop / 3.5rem mobile. Panel main = 2.5rem top / 3rem bottom (post-mejoras)."
  },
  "radius": {
    "small":  { "value": "10px", "use": "Inputs, chips, ex-card, botones secundarios." },
    "card":   { "value": "16px", "use": "Cards, hero, drawer body, fotos." },
    "pill":   { "value": "30px", "use": "CTAs, badges, tabs segmentadas." },
    "circle": { "value": "9999px / 50%", "use": "Avatares, step dots, timer, FAB." }
  },
  "shadow": {
    "card-hover": { "value": "0 4px 20px rgba(0,0,0,0.06)", "use": "Hover en service cards, entrada de drawer." },
    "timer":      { "value": "0 -4px 20px rgba(0,0,0,0.08)", "use": "Barra timer (legacy, bottom). FAB usa shadow verde." },
    "fab":        { "value": "0 8px 24px rgba(29,158,117,0.30), 0 2px 8px rgba(0,0,0,0.12)", "use": "Timer FAB circular (post-mejoras)." },
    "drawer":     { "value": "-4px 0 40px rgba(0,0,0,0.20)", "use": "Panel lateral derecho." },
    "popover":    { "value": "0 4px 20px rgba(0,0,0,0.15)", "use": "Timer picker, menús." },
    "focus":      { "value": "0 0 0 4px rgba(29,158,117,0.15)", "use": "Step-dot activo, focus de input." }
  },
  "breakpoints": {
    "mobile-max":  "480px",
    "tablet-max":  "768px",
    "panel-collapse": "700px",
    "app-max-width": "430px",
    "content-max-width": "1100px",
    "_notes": "Marketing colapsa a 1 columna en 768px. Panel oculta sidebar bajo 700px. App siempre ≤430px centrada."
  }
}
```

---

## 1.7 Espaciado, radios, sombras — variables CSS

```css
:root {
  /* Spacing */
  --amira-space-1: 0.25rem;  --amira-space-2: 0.5rem;   --amira-space-3: 0.75rem;
  --amira-space-4: 1rem;     --amira-space-5: 1.25rem;  --amira-space-6: 1.5rem;
  --amira-space-8: 2rem;     --amira-space-10: 2.5rem;  --amira-space-12: 3rem;
  --amira-space-16: 5rem;

  /* Radii */
  --amira-radius-small:  10px;   /* --rs */
  --amira-radius-card:   16px;   /* --r  */
  --amira-radius-pill:   30px;   /* --rp */
  --amira-radius-circle: 9999px;

  /* Shadows */
  --amira-shadow-card:    0 4px 20px rgba(0,0,0,0.06);
  --amira-shadow-timer:   0 -4px 20px rgba(0,0,0,0.08);
  --amira-shadow-fab:     0 8px 24px rgba(29,158,117,0.30), 0 2px 8px rgba(0,0,0,0.12);
  --amira-shadow-drawer:  -4px 0 40px rgba(0,0,0,0.20);
  --amira-shadow-popover: 0 4px 20px rgba(0,0,0,0.15);
  --amira-shadow-focus:   0 0 0 4px rgba(29,158,117,0.15);
}
```

### Tabla de equivalencia de variables

| Largo (`--amira-*`) | Corto (prod) | Valor |
|---|---|---|
| `--amira-verde` | `--v` | `#1D9E75` |
| `--amira-verde-light` | `--vl` | `#E1F5EE` |
| `--amira-verde-mid` | `--vm` | `#5DCAA5` |
| `--amira-verde-dark` | `--vd` | `#0F6E56` |
| `--amira-purple` | `--p` | `#EEEDFE` |
| `--amira-purple-dark` | `--pd` | `#3C3289` |
| `--amira-amber` | `--a` | `#FAEEDA` |
| `--amira-amber-dark` | `--ad` | `#633806` |
| `--amira-coral-light` | `--co` | `#FAECE7` |
| `--amira-coral-dark` | `--cod` | `#712B13` |
| `--amira-danger-bg` | `--rl` | `#FCEBEB` |
| `--amira-danger` | `--rd` | `#A32D2D` |
| `--amira-bg` | `--bg` | `#f8f8f6` |
| `--amira-surface` | `--s` | `#ffffff` |
| `--amira-surface-2` | `--s2` | `#f3f4f2` |
| `--amira-surface-3` | `--s3` | `#ebebea` |
| `--amira-fg` | `--t` | `#1a1a1a` |
| `--amira-fg-muted` | `--tm` | `#6b7280` |
| `--amira-fg-hint` | `--th` | `#9ca3af` |
| `--amira-border` | `--b` | `rgba(0,0,0,0.07)` |
| `--amira-border-strong` | `--bm` | `rgba(0,0,0,0.12)` |
| `--amira-radius-card` | `--r` | `16px` |
| `--amira-radius-small` | `--rs` | `10px` |
| `--amira-radius-pill` | `--rp` | `30px` |

---

## 1.8 Motion

```css
:root {
  --amira-ease:        cubic-bezier(.4, 0, .2, 1);      /* default — soft ease-out */
  --amira-ease-spring: cubic-bezier(.34, 1.56, .64, 1); /* SOLO celebración + FAB entry */
  --amira-dur-fast:    0.15s;   /* hover/tap */
  --amira-dur:         0.2s;    /* transiciones */
  --amira-dur-slow:    0.35s;   /* slide-up, FAB */
}
```

**Reglas de motion:**
- Easing por defecto: `cubic-bezier(.4,0,.2,1)`. Nunca bouncy por defecto.
- Spring/overshoot reservado a DOS momentos: modal de celebración (`celPop`) y entrada del timer FAB.
- Hover en botones de color: `translateY(-1px)` + oscurecer fondo. Sin glow.
- Press: `transform: scale(.92–.95)`.

**Keyframes canónicos:**
```css
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes celPop { from { transform: scale(.65); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes popCheck { 0%{transform:scale(1)} 40%{transform:scale(1.45)} 65%{transform:scale(.88)} 85%{transform:scale(1.12)} 100%{transform:scale(1)} }
@keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes ripple { 0%{box-shadow:0 0 0 0 rgba(29,158,117,.45)} 70%{box-shadow:0 0 0 12px rgba(29,158,117,0)} 100%{box-shadow:0 0 0 0 rgba(29,158,117,0)} }
```

---

# 2. INVENTARIO DE COMPONENTES

Todos los componentes asumen las variables cortas (`--v`, `--s`, etc.) definidas. El código es de producción (vanilla CSS) salvo donde se indica React.

---

## 2.1 Botones

**Anatomía:** pill (`border-radius: 30px`), `font-weight: 500`, `font-family: 'DM Sans'`. Padding base `13px 26px` (grande) o `7px 14px` (small `.btn-s`).

**Variantes:** primary (verde), secondary (outline neutro), WhatsApp (verde WA), danger, warn (amber), purple, outline-verde, white (sobre oscuro).

**Estados:** hover = oscurecer + `translateY(-1px)` (en CTAs); outline hover = rellenar con tint. Press = sin transform. Disabled = `opacity:.5; pointer-events:none`.

```css
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:30px;font-size:14px;font-weight:500;text-decoration:none;transition:all .2s;cursor:pointer;border:1px solid var(--bm);background:var(--s);color:var(--t);font-family:'DM Sans',sans-serif;}
.btn:hover{background:var(--s2);}
.btn-s{padding:7px 14px;font-size:12px;}

/* Primary */
.btn-verde,.btn-p{background:var(--v);color:#fff;border-color:var(--v);}
.btn-verde:hover,.btn-p:hover{background:var(--vd);transform:translateY(-1px);}

/* WhatsApp */
.btn-wa{background:#25D366;color:#fff;border-color:#25D366;}
.btn-wa:hover{background:#1da851;transform:translateY(-1px);}

/* Outline verde */
.btn-verde-outline{background:transparent;color:var(--v);border:1.5px solid var(--v);}
.btn-verde-outline:hover{background:var(--vl);}

/* Variantes panel */
.btn-d{color:var(--rd);border-color:#F09595;}
.btn-d:hover{background:var(--rl);}
.btn-warn{background:var(--a);color:var(--ad);border-color:transparent;}
.btn-purple{background:var(--p);color:var(--pd);border-color:transparent;}

/* Sobre fondo oscuro */
.btn-white{background:#fff;color:var(--vd);}
.btn-white:hover{background:var(--vl);transform:translateY(-1px);}

/* Disabled (cualquier variante) */
.btn:disabled,.btn[disabled]{opacity:.5;pointer-events:none;}
```

```html
<button class="btn btn-p">Quiero empezar</button>
<button class="btn btn-p btn-s">Guardar</button>
<button class="btn">Cancelar</button>
<button class="btn btn-verde-outline">Ver rutina</button>
<button class="btn btn-wa">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><!-- WhatsApp glyph (ver 2.12) --></svg>
  Escribime y charlamos
</button>
<button class="btn btn-warn btn-s">Pausar</button>
<button class="btn btn-purple btn-s">Variantes</button>
<button class="btn btn-d btn-s">Eliminar</button>
<button class="btn btn-p" disabled>Enviando…</button>
```

---

## 2.2 Badges, chips y tags

**Status badge:** `font-size:10px; padding:2px 9px; border-radius:30px; font-weight:500`. Siempre par tint+texto.
**Chip filtro/multi:** pill outline; activo = tint + texto-dark + `border-color:transparent`.
**Service tag:** verde claro, redondeado pill.

```css
.badge{font-size:10px;padding:2px 9px;border-radius:30px;font-weight:500;}
.badge.bg,.bg{background:var(--vl);color:var(--vd);}        /* activa/success */
.badge.bd,.bd{background:var(--p);color:var(--pd);}         /* pausada/info */
.badge.bw{background:var(--a);color:var(--ad);}             /* pendiente/warn */

.chip{padding:5px 13px;border-radius:30px;font-size:11px;border:1px solid var(--bm);background:var(--s);color:var(--tm);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;}
.chip.selected{background:var(--p);color:var(--pd);border-color:transparent;font-weight:500;}
.chip.v{background:var(--vl);color:var(--vd);border-color:var(--vd);font-weight:500;}

.service-tag{font-size:11.5px;font-weight:500;color:var(--vd);background:var(--vl);display:inline-block;padding:3px 10px;border-radius:30px;}

/* Ciclo badge (pill con número serif) */
.ciclo-badge{display:inline-flex;align-items:center;gap:6px;background:var(--p);border-radius:30px;padding:4px 12px;font-size:11px;color:var(--pd);font-weight:500;}
.ciclo-num{font-family:'DM Serif Display',serif;font-size:18px;color:var(--pd);line-height:1;}
```

```html
<span class="badge bg">Activa</span>
<span class="badge bd">Pausada</span>
<span class="badge bw">Pendiente</span>
<button class="chip selected">Activas</button>
<button class="chip">Pausadas</button>
<span class="chip v">Tonificar</span>
<span class="service-tag">A distancia</span>
<span class="ciclo-badge"><span class="ciclo-num">3</span> Ciclo 3 — Semana 2</span>
```

---

## 2.3 Inputs y formularios

**Anatomía:** `border:1px solid var(--bm); border-radius:10px; background:var(--s2)`. Focus = borde verde + (opcional) fondo blanco + focus ring. Error = borde+fondo danger.

```css
label{font-size:12px;color:var(--tm);display:block;margin-bottom:5px;font-weight:500;}
input,select,textarea{width:100%;padding:10px 14px;border:1px solid var(--bm);border-radius:10px;font-size:13px;font-family:'DM Sans',sans-serif;color:var(--t);background:var(--s2);transition:border-color .15s;}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--v);background:var(--s);}
textarea{height:80px;resize:vertical;}

/* Estado focus enfatizado (con ring) */
.input-focus{border-color:var(--v);background:var(--s);box-shadow:0 0 0 3px rgba(29,158,117,0.12);}

/* Error */
.input-error{border-color:var(--rd);background:var(--rl);}
.input-errlbl{color:var(--rd);font-size:11px;margin-top:4px;}

/* Disabled */
input:disabled,select:disabled,textarea:disabled{opacity:.55;cursor:not-allowed;}

/* Switch (toggle) */
.switch{display:inline-block;width:36px;height:20px;background:var(--v);border-radius:99px;position:relative;cursor:pointer;}
.switch::after{content:'';position:absolute;top:2px;right:2px;width:16px;height:16px;background:#fff;border-radius:50%;transition:all .2s;}
.switch.off{background:var(--s3);}
.switch.off::after{left:2px;right:auto;}
```

```html
<label>Nombre</label>
<input value="María González">

<label>Email</label>
<input class="input-focus" value="maria@ejemplo.com">

<label>Teléfono</label>
<input class="input-error" value="123">
<div class="input-errlbl">Ingresá un teléfono válido</div>

<label>Notas para la alumna</label>
<textarea>Cualquier molestia, avisame enseguida 💪</textarea>

<span class="switch"></span>        <!-- on -->
<span class="switch off"></span>    <!-- off -->
```

---

## 2.4 Service card (marketing)

```css
.service-card{background:var(--s);border:1px solid var(--b);border-radius:16px;padding:1.75rem;transition:box-shadow .2s;}
.service-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.06);}
.service-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:1.25rem;}
.icon-green{background:var(--vl);} .icon-amber{background:var(--a);} .icon-purple{background:var(--p);}
.service-card h3{font-size:15px;font-weight:500;margin-bottom:.5rem;color:var(--t);}
.service-card p{font-size:13px;color:var(--tm);line-height:1.75;}
```

```html
<div class="service-card">
  <div class="service-icon icon-green">📋</div>
  <h3>Rutina 100% personalizada</h3>
  <p>Armada específicamente para vos: tus objetivos, tu nivel, tu equipamiento.</p>
  <span class="service-tag">A distancia</span>
</div>
```

---

## 2.5 Avatares

4 colores rotativos por alumna (estables por sesión) + variante foto. Letra siempre DM Serif Display. Tamaños: SM 34px (nav), MD 48px (hero), LG 64px (perfil).

```css
.av{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:19px;overflow:hidden;flex-shrink:0;}
.av img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
.av-teal{background:var(--vl);color:var(--vd);}
.av-purple{background:var(--p);color:var(--pd);}
.av-amber{background:var(--a);color:var(--ad);}
.av-coral{background:var(--co);color:var(--cod);}
.av.sm{width:34px;height:34px;font-size:14px;}
.av.lg{width:64px;height:64px;font-size:24px;}
```

```html
<div class="av av-teal">A</div>
<div class="av av-purple">M</div>
<div class="av av-teal"><img src="foto-amira.jpg" alt=""></div>
```

---

## 2.6 Exercise card (app alumna) — versión refinada

Tap en toda la card marca hecho. Peso inline. Tip/Video como iconos. Estado done: número verde + nombre tachado sutil + chip "Hecho".

```css
.ex-card{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:12px 14px;margin-bottom:8px;width:100%;text-align:left;position:relative;cursor:pointer;transition:all .25s;}
.ex-card.done{border-color:var(--vm);}
.ex-top{display:flex;align-items:center;gap:12px;}
.ex-num{width:28px;height:28px;border-radius:50%;background:transparent;border:1.5px solid var(--bm);color:var(--tm);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;flex-shrink:0;transition:all .2s;}
.ex-card.done .ex-num{background:var(--v);color:#fff;border-color:var(--v);}
.ex-name{font-size:13px;font-weight:600;color:var(--t);margin-bottom:3px;}
.ex-card.done .ex-name{text-decoration:line-through;opacity:.55;}
.ex-reps{font-size:10px;color:var(--tm);background:var(--s2);padding:2px 7px;border-radius:99px;}
.ex-actions{display:flex;align-items:center;gap:6px;flex-shrink:0;}
.ex-peso{width:44px;padding:5px 6px;border:1px solid var(--bm);border-radius:8px;font-size:11px;background:var(--s2);text-align:center;color:var(--t);}
.ex-iconbtn{width:28px;height:28px;border-radius:8px;background:transparent;border:1px solid var(--b);display:flex;align-items:center;justify-content:center;color:var(--tm);cursor:pointer;}
.ex-done-chip{position:absolute;top:12px;right:14px;font-size:9px;background:var(--vl);color:var(--vd);border-radius:99px;padding:2px 7px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;}
```

```html
<button class="ex-card">
  <div class="ex-top">
    <div class="ex-num">1</div>
    <div style="flex:1;min-width:0;">
      <div class="ex-name">Hollow Hold</div>
      <span class="ex-reps">3×20-30"</span>
    </div>
    <div class="ex-actions">
      <input class="ex-peso" placeholder="kg">
      <button class="ex-iconbtn" title="Tip">💡</button>
      <button class="ex-iconbtn" title="Video">▶</button>
    </div>
  </div>
</button>

<button class="ex-card done">
  <div class="ex-top">
    <div class="ex-num">✓</div>
    <div style="flex:1;"><div class="ex-name">Sentadilla al cajón</div><span class="ex-reps">3×10</span></div>
  </div>
  <div class="ex-done-chip">Hecho</div>
</button>
```

---

## 2.7 Progress bar (app) — versión refinada

Barra de 26px con "5/8" adentro en blanco; "62%" tenue afuera (oculto >88%).

```css
.prog-wrap{margin-bottom:1rem;}
.prog-bar{height:26px;background:var(--s2);border-radius:99px;overflow:hidden;position:relative;}
.prog-fill{height:100%;background:var(--v);border-radius:99px;transition:width .4s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;justify-content:flex-end;padding-right:10px;min-width:42px;}
.prog-num{font-size:11px;font-weight:600;color:#fff;letter-spacing:.02em;}
.prog-pct{position:absolute;top:50%;right:12px;transform:translateY(-50%);font-size:11px;color:var(--tm);font-weight:500;}
```

```html
<div class="prog-wrap">
  <div class="prog-bar">
    <div class="prog-fill" style="width:62%"><span class="prog-num">5/8</span></div>
    <span class="prog-pct">62%</span>
  </div>
</div>
```

---

## 2.8 Tabs

**Soft-pill (semana/ciclo):** pill outline, activo = purple tint.
**Day tabs (refinado):** flat, activo = fondo `--vl` + texto `--vd` + banda inferior verde 2px (ya NO verde sólido inundado).
**Drawer underline tabs:** texto con borde inferior animado.

```css
/* Soft-pill */
.stab{padding:5px 13px;border-radius:30px;font-size:11px;border:1px solid var(--bm);background:var(--s);color:var(--tm);cursor:pointer;}
.stab.active{background:var(--p);color:var(--pd);border-color:transparent;font-weight:500;}

/* Day tabs refinado */
.dtabs{display:flex;gap:0;border-bottom:1px solid var(--b);}
.dtab{flex:1;padding:9px 4px 11px;border-radius:8px 8px 0 0;font-size:12px;font-weight:500;border:none;background:transparent;color:var(--tm);cursor:pointer;text-align:center;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;}
.dtab.active{background:var(--vl);color:var(--vd);font-weight:600;border-bottom-color:var(--v);}

/* Drawer underline */
.dwtab{padding:8px 14px;font-size:12px;color:var(--tm);background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;}
.dwtab.active{font-weight:600;color:var(--v);border-bottom-color:var(--v);}
```

```html
<div class="dtabs">
  <button class="dtab">Día 1</button>
  <button class="dtab active">Día 2</button>
  <button class="dtab">Día 3</button>
</div>
```

---

## 2.9 Timer FAB (app) — versión refinada

Botón circular flotante 72px abajo-derecha, anillo SVG de progreso, × overlay para saltar, picker de tiempo. Entra con spring.

```css
.timer{position:fixed;bottom:calc(72px + env(safe-area-inset-bottom,0px));right:16px;width:72px;height:72px;background:var(--v);border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:30;box-shadow:0 8px 24px rgba(29,158,117,.30),0 2px 8px rgba(0,0,0,.12);transform:translateY(120px) scale(.5);transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .2s;visibility:hidden;pointer-events:none;}
.timer.show{transform:translateY(0) scale(1);visibility:visible;pointer-events:auto;}
.timer:active{box-shadow:0 4px 12px rgba(29,158,117,.45),0 1px 4px rgba(0,0,0,.15);}
.tcircle{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;}
.tnum{font-family:'DM Serif Display',serif;font-size:26px;color:#fff;z-index:1;line-height:1;}
.tring{position:absolute;inset:0;border-radius:50%;}
.tskip{position:absolute;top:-6px;right:-6px;width:24px;height:24px;border-radius:50%;background:var(--s);border:1px solid var(--bm);color:var(--tm);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.10);z-index:2;cursor:pointer;}
.tskip::before{content:'✕';font-size:12px;}
.timer-picker{position:absolute;bottom:calc(100% + 12px);right:0;background:var(--s);border:1px solid var(--bm);border-radius:14px;padding:10px 6px;display:flex;gap:6px;align-items:center;box-shadow:0 4px 20px rgba(0,0,0,.15);white-space:nowrap;z-index:10;animation:fadeIn .18s ease;}
.tpick-opt{padding:7px 13px;border-radius:10px;font-size:13px;font-weight:500;border:none;background:var(--s2);color:var(--tm);cursor:pointer;}
.tpick-opt.active{background:var(--v);color:#fff;}
```

```html
<div class="timer show" id="timer">
  <div class="tcircle" onclick="toggleTimerPicker()">
    <svg class="tring" viewBox="0 0 54 54">
      <circle cx="27" cy="27" r="24" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>
      <circle id="tarc" cx="27" cy="27" r="24" fill="none" stroke="#fff" stroke-width="3"
              stroke-dasharray="150.8" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 27 27)"/>
    </svg>
    <span class="tnum" id="tnum">45</span>
    <div class="timer-picker" id="timer-picker" style="display:none;" onclick="event.stopPropagation()">
      <span style="font-size:10px;color:var(--th);padding:0 4px;">Descanso</span>
      <button class="tpick-opt" onclick="setTimerDuration(30)">30s</button>
      <button class="tpick-opt active" onclick="setTimerDuration(45)">45s</button>
      <button class="tpick-opt" onclick="setTimerDuration(60)">60s</button>
    </div>
  </div>
  <button class="tskip" onclick="event.stopPropagation();skipTimer()" aria-label="Saltar descanso"></button>
</div>
```

---

## 2.10 Celebration modal (app)

Overlay oscuro + card con entrada spring. Emoji grande, título serif, badge, mensaje, botón.

```css
.cel-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100;display:flex;align-items:center;justify-content:center;padding:1.5rem;animation:fadeIn .25s ease;}
.cel-card{background:var(--s);border-radius:24px;padding:2.25rem 1.75rem 1.75rem;text-align:center;max-width:320px;width:100%;animation:celPop .45s cubic-bezier(.34,1.56,.64,1);}
.cel-emoji{font-size:3.5rem;display:block;margin-bottom:.6rem;}
.cel-title{font-family:'DM Serif Display',serif;font-size:1.6rem;color:var(--t);margin-bottom:.5rem;}
.cel-badge{display:inline-block;background:var(--vl);color:var(--vd);font-size:12px;font-weight:500;border-radius:30px;padding:5px 14px;margin-bottom:1.25rem;}
.cel-msg{font-size:13px;color:var(--tm);margin-bottom:1.25rem;line-height:1.6;}
.cel-btn{width:100%;background:var(--v);color:#fff;border:none;border-radius:30px;padding:13px;font-size:14px;font-weight:500;cursor:pointer;}
```

```html
<div class="cel-overlay">
  <div class="cel-card">
    <span class="cel-emoji">🎉</span>
    <h2 class="cel-title">¡Día 2 completo!</h2>
    <div class="cel-badge">Una sesión más</div>
    <p class="cel-msg">Cada vez que entrenás, te alejás del "algún día" y te acercás al "ya estoy".</p>
    <button class="cel-btn">Cerrar</button>
  </div>
</div>
```

---

## 2.11 Notas / callouts

```css
.nota-tip{background:var(--vl);color:var(--vd);border-radius:10px;padding:.7rem 1rem;font-size:12px;line-height:1.55;}
.nota-warn{background:var(--a);color:var(--ad);border-radius:10px;padding:.7rem 1rem;font-size:12px;line-height:1.55;}
.nota-info{background:var(--p);color:var(--pd);border-radius:10px;padding:.7rem 1rem;font-size:12px;line-height:1.55;}
.nota-danger{background:var(--rl);color:var(--rd);border-radius:10px;padding:.7rem 1rem;font-size:12px;line-height:1.55;}

/* Callout sobre sección verde oscura (filosofía) */
.callout{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:1.75rem;color:#fff;}
.callout .big{font-family:'DM Serif Display',serif;font-style:italic;font-size:2.8rem;line-height:1;margin-bottom:.75rem;}
.callout p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.7;}
```

---

## 2.12 Navegación

**Top nav (marketing):** sticky, blur 14px sobre blanco 93%.
**App header:** logo + saludo + toggle tema. Sticky.
**Bottom nav (app):** fixed, 4 items, máx 430px.
**Sidebar (panel) refinado:** item activo = barra lateral verde 3px (no fondo pintón). Section headers 10px tracking .8px con divisor arriba. Footer "Sincronizado" (sin mención a Supabase).

```css
/* Top nav */
nav.top{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.93);backdrop-filter:blur(14px);border-bottom:1px solid var(--b);padding:.9rem 2rem;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{width:34px;height:34px;border-radius:50%;background:var(--vl);display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:14px;color:var(--vd);}
.nav-cta{background:var(--v);color:#fff;padding:8px 18px;border-radius:30px;font-size:13px;font-weight:500;text-decoration:none;}
.nav-cta:hover{background:var(--vd);}

/* App header */
.header{background:var(--s);border-bottom:1px solid var(--b);padding:.9rem 1.25rem;display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:20;}
.hlogo{width:34px;height:34px;border-radius:50%;background:var(--vl);display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:14px;color:var(--vd);}

/* Bottom nav */
.bnav{position:fixed;bottom:0;left:0;right:0;max-width:430px;margin:0 auto;background:var(--s);border-top:1px solid var(--b);display:flex;z-index:25;}
.bitem{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 4px;border:none;background:none;}
.bitem span:first-child{font-size:18px;}
.bitem span:last-child{font-size:10px;color:var(--tm);}
.bitem.active span:last-child{color:var(--v);font-weight:500;}

/* Sidebar refinado */
.nav{display:flex;align-items:center;gap:8px;padding:.55rem .85rem;border-radius:10px;font-size:13px;color:var(--tm);cursor:pointer;border:none;background:none;width:100%;text-align:left;transition:all .15s;position:relative;}
.nav:hover{background:var(--s2);color:var(--t);}
.nav.active{background:transparent;color:var(--t);font-weight:500;}
.nav.active::before{content:'';position:absolute;left:-12px;top:8px;bottom:8px;width:3px;background:var(--v);border-radius:0 3px 3px 0;}
.nav.active .ni{color:var(--v);}
.nav-sec{font-size:10px;letter-spacing:.8px;text-transform:uppercase;color:var(--tm);padding:.85rem .85rem .35rem;margin-top:.4rem;border-top:1px solid var(--b);font-weight:500;}
.nav-sec:first-of-type{border-top:none;margin-top:0;padding-top:.35rem;}
.sb-conn{display:flex;align-items:center;gap:6px;padding:.4rem .85rem;font-size:11px;color:var(--tm);}
.sb-conn.ok{display:none;}
.sb-conn.err{color:var(--rd);}
```

**WhatsApp glyph (único SVG de marca):**
```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.564 4.14 1.544 5.875L0 24l6.336-1.52A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.366l-.36-.214-3.732.896.942-3.623-.235-.373A9.815 9.815 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/>
</svg>
```

---

## 2.13 Métricas (panel dashboard)

```css
.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.metric{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:1rem 1.25rem;}
.mlabel{font-size:11px;color:var(--tm);margin-bottom:4px;}
.mval{font-family:'DM Serif Display',serif;font-size:2rem;color:var(--t);line-height:1;}
.mval.g{color:var(--vd);}
```

```html
<div class="metrics">
  <div class="metric"><div class="mlabel">Alumnas activas</div><div class="mval g">12</div></div>
  <div class="metric"><div class="mlabel">Pendientes</div><div class="mval">3</div></div>
</div>
```

---

## 2.14 Drawer lateral (panel) + overflow menu

```css
.drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;}
.drawer{position:fixed;top:0;right:0;width:min(620px,100vw);height:100vh;background:var(--s);z-index:101;overflow-y:auto;box-shadow:-4px 0 40px rgba(0,0,0,.2);display:flex;flex-direction:column;animation:slideIn .2s ease;}
.drawer-hd{position:sticky;top:0;background:var(--s);z-index:10;border-bottom:1px solid var(--b);padding:1rem 1.25rem 0;}
.drawer-tabs{display:flex;overflow-x:auto;}
.dwtab{padding:8px 14px;font-size:12px;color:var(--tm);background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;white-space:nowrap;}
.dwtab.active{font-weight:600;color:var(--v);border-bottom-color:var(--v);}
/* Overflow menu (⋯): Copiar link · WhatsApp · Informe · Pausar/Reactivar · Eliminar */
.drawer-menu{position:absolute;top:calc(100% + 6px);right:0;background:var(--s);border:1px solid var(--bm);border-radius:10px;padding:4px;z-index:30;min-width:200px;box-shadow:0 4px 20px rgba(0,0,0,.15);}
.drawer-menu .btn{width:100%;text-align:left;border:none;padding:8px 10px;font-size:12px;}
```

---

## 2.15 Wizard stepper (registro)

```css
.steps{display:flex;align-items:center;}
.step-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;flex-shrink:0;transition:all .3s;}
.step-dot.done{background:var(--v);color:#fff;}
.step-dot.active{background:var(--v);color:#fff;box-shadow:0 0 0 4px rgba(29,158,117,0.15);}
.step-dot.pending{background:var(--s);border:1px solid var(--bm);color:var(--tm);}
.step-line{flex:1;height:2px;background:var(--b);margin:0 6px;transition:background .3s;}
.step-line.done{background:var(--v);}
/* Número de paso grande (cómo funciona) */
.step-num{width:44px;height:44px;border-radius:50%;background:var(--v);color:#fff;font-family:'DM Serif Display',serif;font-size:20px;display:flex;align-items:center;justify-content:center;}
```

---

## 2.16 Chat de notas (app) — versión refinada

Bubbles diferenciados: Amira izquierda con mini-avatar, alumna derecha en verde claro.

```css
.chat-row.amira{display:flex;align-items:flex-start;gap:8px;max-width:80%;}
.chat-bubble-amira{background:var(--s);border:1px solid var(--b);border-radius:14px 14px 14px 4px;padding:8px 12px;font-size:12px;color:var(--t);line-height:1.5;}
.chat-row.alumna{display:flex;justify-content:flex-end;}
.chat-bubble-alumna{background:var(--vl);border-radius:14px 14px 4px 14px;padding:8px 12px;font-size:12px;color:var(--vd);line-height:1.5;max-width:80%;}
.chat-meta{font-size:9px;color:var(--th);margin-top:3px;}
.chat-composer{display:flex;gap:6px;}
.chat-composer input{flex:1;padding:8px 12px;border:1px solid var(--bm);border-radius:99px;font-size:12px;background:var(--s2);}
.chat-send{width:36px;height:36px;border-radius:50%;background:var(--v);color:#fff;border:none;display:flex;align-items:center;justify-content:center;}
```

---

## 2.17 Login (panel) — versión refinada

Email + password + "Recordarme" + "¿Olvidaste?", con foto de Amira y saludo "Hola, Amira".

```css
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);}
.login-box{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:2.25rem;width:100%;max-width:420px;}
.login-head{display:flex;align-items:center;gap:14px;margin-bottom:20px;}
.login-photo{width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:center 70%;}
```

---

# 3. GUÍAS DE USO

## 3.1 Vibe del sistema

**Quiet, warm, personal, careful.** Marca de estudio pequeño que resiste tropes: nada de fondos gradiente (salvo el ÚNICO del CTA final), nada de neón, nada de ilustraciones generadas, nada de "wellness-app glow". Todo se ve hecho a mano, tipográfico, e íntimo a 430px de ancho. **El serif itálico hace el trabajo emocional; el verde hace el trabajo de confianza; el crema mantiene todo cálido (no clínico).**

## 3.2 Reglas de color

- Verde `#1D9E75` para CTAs, marca, success. Una sola identidad cromática.
- Fondo SIEMPRE crema `#f8f8f6` — **nunca blanco puro**. Blanco puro solo para cards sobre crema.
- Tints secundarios (purple/amber/coral) SOLO para: fondos de tip/nota, avatares, chips de iconos. Cada tint con su texto-dark.
- Sin rojos brillantes, sin amarillos brillantes, sin neón. Danger es `#A32D2D` apagado.
- Único gradiente permitido: CTA final `linear-gradient(135deg, var(--vd) 0%, var(--v) 100%)`. No agregar más.

## 3.3 Reglas de tipografía

- Dos familias, sin excepción: **DM Sans** (body/UI, pesos 300/400/500/600) + **DM Serif Display** (headlines emocionales, números grandes, marca, itálicas de énfasis).
- Todo headline que deba "aterrizar emocionalmente" usa el serif.
- Peso 600 reservado: títulos de card del panel, nombre de alumna en drawer, nombre de ejercicio con peso logueado.
- Eyebrows: 11px uppercase verde, tracking .1em.

## 3.4 Reglas de forma y profundidad

- Tres radios estrictos: `10px` (controles), `16px` (cards), `30px` (pills). Más `50%` para círculos.
- Sombras casi ausentes: cards sin sombra por defecto (solo hairline). Las 5–6 sombras permitidas están en 1.6/1.7. La signature de interacción es **lift + color shift**, no glow.
- Borde dashed SOLO en el CTA "día sin programa" (`1px dashed #e5a37e`).

## 3.5 Reglas de motion

- Easing default `cubic-bezier(.4,0,.2,1)`. Spring SOLO en celebración + entrada del FAB.
- Hover en botones de color: oscurecer + `translateY(-1px)`. Outline: rellenar con tint.
- Press: `scale(.92–.95)`.

## 3.6 Cuándo usar cada componente

| Necesidad | Componente |
|---|---|
| Acción principal | `.btn.btn-p` (verde) |
| Contacto / conversión | `.btn.btn-wa` (WhatsApp) |
| Acción secundaria | `.btn` (outline neutro) |
| Acción destructiva | `.btn.btn-d` |
| Estado de alumna | `.badge` (bg/bd/bw) |
| Filtro de lista | `.chip` |
| Ejercicio del día | `.ex-card` (con done state) |
| Progreso del día | `.prog-bar` (refinada) |
| Selección día/semana | `.dtabs` (refinada) / `.stab` |
| Descanso entre series | Timer FAB |
| Logro completado | `.cel-overlay` |
| Tip de técnica | `.nota-tip` |
| Nota de Amira | `.nota-warn` (amber) |
| Error de validación | `.nota-danger` / `.input-error` |
| Detalle de alumna (panel) | `.drawer` + tabs + overflow menu |
| Métrica de dashboard | `.metric` |

## 3.7 Iconografía

- **Emoji como sistema primario** de iconos (renderea según OS — la inconsistencia es aceptada, refuerza el tono personal). NO "arreglar" con icon font.
- **SVG hand-rolled SOLO** para el glyph de WhatsApp (marca registrada).
- **CSS shapes** para play-triangle y chevrons.
- **Unicode** como iconos: `→` `✓` `·` `▶` `"`.
- **NO importar** Lucide/Heroicons/FontAwesome en la UI de producción. (En las mejoras propuestas se documentó un mapeo emoji→Lucide para un futuro sprint de iconografía, pero producción sigue con emoji.)
- Marca: "A" en DM Serif Display dentro de círculo verde-tint (o verde sólido sobre oscuro). Sin wordmark separado.

## 3.8 Convenciones de contenido (voz)

- **Español rioplatense, voseo obligatorio:** "tenés", "querés", "podés", "escribime", "contale". Nunca tú/ustedes.
- **Femenino:** alumna (nunca alumno), cada una.
- **Primera persona (Amira):** "yo quiero", "te armo", "te respondo yo, no un bot".
- **Sentence case en todo** (títulos, botones, badges). Solo eyebrows en uppercase.
- **Sin hype.** Nada de "transformá tu cuerpo" o "resultados garantizados". Sí: "objetivos reales, no ideales de revista".
- **Emoji deliberado, no decorativo:** uno por concepto en service cards; cierre de mensajes WhatsApp (💪🌟💚); momentos celebratorios. **Nunca** dentro de CTAs ni en la UI admin del panel.
- **Marca:** siempre "Amira Fitness" (dos palabras capitalizadas).
- Separadores: middle-dot `·` antes que comas en trust strips/footers.

## 3.9 Layout

- Section padding vertical: `5rem` desktop / `3.5rem` mobile.
- Max content width: `1100px` (marketing/panel), `430px` (app, mobile-only).
- App: header sticky arriba, bottom-nav fixed, timer FAB flotante.
- Panel: sidebar fijo 230px (oculto <700px), main `2.5rem` top / `3rem` bottom.
- Marketing: 1 nav sticky con blur. Colapsa a 1 columna <768px.

---

# 4. INSTRUCCIONES DE RECONSTRUCCIÓN

> Pegá el siguiente prompt en una instancia nueva de Claude Design, junto con este documento completo, para recrear el design system desde cero.

```
Quiero que reconstruyas el design system "Amira Fitness" en este proyecto,
usando el documento DESIGN-SYSTEM-AMIRAFITNESS.md que te adjunto como ÚNICA
fuente de verdad. Es un proyecto de design system (no un deliverable suelto):
un compilador lee styles.css/colors_and_type.css + componentes con .d.ts + .jsx,
y cards HTML tagueadas con <!-- @dsCard -->.

CONTEXTO DEL PRODUCTO
Amira Fitness es el servicio de entrenamiento personal online de Amira Lezcano
(Buenos Aires). Tres superficies: (1) marketing — landing + wizard de registro;
(2) app de la alumna — PWA mobile-only (≤430px), instalable, con dark mode;
(3) panel de la profesora — admin desktop con sidebar + drawer. Toda la marca
es femenina y en español rioplatense (voseo).

TAREAS, EN ORDEN
1. Creá colors_and_type.css en la raíz con TODOS los tokens de la sección 1
   del documento (colores, dark mode, tipografía, espaciado, radios, sombras,
   motion) como variables CSS --amira-* + las clases semánticas .amira-*.
   Importá DM Sans (300/400/500/600 + italic 400) y DM Serif Display (400 +
   italic) desde Google Fonts. Anotá cada token de line-height con
   /* @kind font */ y los de motion con /* @kind other */.
2. Creá ui_kits/shared.css con las variables CORTAS de producción (--v, --vl,
   --s, --t, --bm, etc.) según la tabla de equivalencia 1.7, incluyendo el
   bloque [data-theme="dark"].
3. Replicá las TRES superficies como UI kits interactivos click-thru en
   ui_kits/{alumna,panel,marketing}/ usando React + Babel (script tags pinneados
   con integrity). Cada kit: index.html + componentes .jsx bien factorizados
   (Header, BottomNav, ExerciseCard, Timer FAB, CelebrationModal, ProgressScreen,
   NotesScreen/chat para alumna; Sidebar, LoginScreen, Dashboard, AlumnasList con
   search, AlumnaDrawer con overflow menu, RoutineBuilder para panel; Nav, Hero,
   Filosofia, Steps, Services, AppPreview, CTAFinal, Footer para marketing).
   IMPORTANTE: el nombre del componente raíz se deriva del NOMBRE DEL ARCHIVO,
   así que nombrá cada root distinto (AlumnaApp.jsx, PanelApp.jsx, MarketingApp.jsx)
   — nunca App.jsx repetido. Cada styles object global debe tener nombre único
   (headerStyles, no styles).
4. Construí TODOS los componentes de la sección 2 con sus variantes y estados
   (hover/disabled/error/done). Usá el código provisto como base — es de
   producción. Respetá las versiones REFINADAS: progress bar 26px con número
   adentro, day tabs flat (no verde inundado), timer FAB circular bottom-right,
   sidebar con barra lateral activa (no fondo pintón), login con email+password.
5. Creá cards de preview en preview/ (target ~700px ancho) tagueadas con
   <!-- @dsCard group="..." --> en la línea 1: separá Type (display/body/scale),
   Colors (primary/accents/neutrals/dark), Spacing (radii/scale/shadows),
   Components (buttons/badges/forms/service-cards/avatars/exercise-card/tabs/
   stepper/nav/notes), Brand (logo/photo/iconography/voice). Apuntá a 25+ cards
   chicas, no pocas densas.
6. Generá assets/: PWA icons SVG (rect verde #1D9E75 redondeado + "A" blanca
   serif), y un placeholder para la foto de Amira (foto-amira.jpg).
7. Escribí README.md (contexto, content fundamentals, visual foundations,
   iconography) y SKILL.md (Agent Skill compatible).

REGLAS DE MARCA NO NEGOCIABLES (de la sección 3)
- Verde #1D9E75 único color de identidad. Fondo SIEMPRE crema #f8f8f6, nunca
  blanco puro. Blanco solo para cards.
- Dos fuentes: DM Serif Display (emoción/números/marca) + DM Sans (todo lo demás).
- Tres radios: 10/16/30px. Sombras casi ausentes (signature = lift + color shift).
- Único gradiente: CTA final 135deg verde-d→verde. Cero gradientes más.
- Iconografía emoji-first; SVG hand-rolled solo para el glyph WhatsApp; NO icon
  font, NO Lucide en producción.
- Voz: voseo, primera persona (Amira), sentence case, sin hype, emoji deliberado
  fuera de CTAs y del panel admin.
- Motion: easing default cubic-bezier(.4,0,.2,1); spring solo en celebración + FAB.

Al terminar, corré la validación del design system, arreglá lo que reporte
(tokens sin @kind, nombres de componente duplicados) y confirmá que las 3 UI
kits cargan sin errores de consola.
```

---

## APÉNDICE — Checklist de paridad post-migración

- [ ] `colors_and_type.css` con 134 tokens (todos clasificados)
- [ ] `ui_kits/shared.css` con variables cortas + dark mode
- [ ] 3 UI kits cargando sin errores (alumna, panel, marketing)
- [ ] Root components con nombres únicos de archivo
- [ ] ~27 cards de preview tagueadas y agrupadas
- [ ] Assets: PWA icons + foto placeholder
- [ ] README.md + SKILL.md
- [ ] Versiones refinadas aplicadas (progress 26px, day tabs flat, timer FAB, sidebar barra lateral, login email+password)
- [ ] Voz rioplatense/voseo verificada en todo el copy
- [ ] Verde #1D9E75 + crema #f8f8f6 + DM Sans/Serif respetados

---

*Fin del documento. Esta es la fuente única de verdad del design system Amira Fitness tras la migración.*
