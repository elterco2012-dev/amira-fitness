# Alumna (Student) UI Kit

The mobile-first PWA that each student gets a personal link to (`amira-fitness.vercel.app/alumna/<slug>`). It's the daily-use surface — students open it every training day to see today's routine, watch reference videos, log weights, and leave notes for Amira.

## Surface character

- **Mobile-only.** Max width 430px, centered on desktop. The source ships no tablet/desktop variant.
- **Installable PWA.** Manifest + service worker; works offline.
- **Sticky header + fixed bottom nav.** Standard mobile app shell. A floating timer slides up from above the bottom nav during rest periods.
- **Two themes.** Light + Dark via `data-theme` on `<html>`.

## Files in this kit

| File | Purpose |
|---|---|
| `index.html` | Composed click-thru — boots the app, lets you toggle theme, switch screens via bottom nav, mark exercises done. |
| `AppShell.jsx` | The 430px wrapper + theme provider. |
| `Header.jsx` | Top bar with logo + greeting + theme toggle. |
| `BottomNav.jsx` | 4-icon fixed bottom nav. |
| `ExerciseCard.jsx` | The daily-routine list item — default + done states. |
| `WarmupCard.jsx` | Amber-tinted warmup CTA. |
| `Timer.jsx` | Floating rest timer above bottom nav. |
| `DayTabs.jsx` / `WeekChips.jsx` | Week + day selectors. |
| `ProgressBar.jsx` | Day-completion progress. |
| `CelebrationModal.jsx` | "Día completo" overlay with bouncy entry. |
| `ProgressScreen.jsx` | Stat cards + chart placeholder. |
| `NotesScreen.jsx` | Two-way notes between alumna and Amira. |

## What's recreated vs. omitted

✅ Visual fidelity of header, exercise cards, bottom nav, warmup card, day/week tabs, progress bar, timer, dark mode.

⚠️ Stripped from the source: Supabase persistence, push notifications, the onboarding tour, push-banner handling, video embeds (kept as links), Chart.js (replaced with a static SVG placeholder).

The kit is for prototyping — not a drop-in replacement.
