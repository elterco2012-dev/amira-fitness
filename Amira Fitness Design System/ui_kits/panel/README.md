# Panel (Profesora) UI Kit

Amira's admin dashboard. Desktop-first, sidebar + main layout. This is where she manages students, builds routines week-by-week, reviews progress, and triggers WhatsApp blasts.

## Surface character

- **Desktop-first.** Sidebar (230px) + main content. Sidebar hides under 700px.
- **Login screen** gates the panel — a single password.
- **Drawer pattern** for alumna detail — slides in from the right with tabs (Rutina · Datos · Historial · Notas).
- **Many small CRUD surfaces** sharing the same card + form vocabulary.

## Files in this kit

| File | Purpose |
|---|---|
| `index.html` | Composed click-thru — login → dashboard → click an alumna row to open her drawer. |
| `Sidebar.jsx` | Brand + nav + connection-status footer. |
| `LoginScreen.jsx` | Single-input password gate. |
| `Dashboard.jsx` | Top-level metrics + recent-activity card. |
| `AlumnasList.jsx` | Filterable list of students with avatar + status. |
| `AlumnaDrawer.jsx` | Right-side detail drawer with tabbed content. |
| `RoutineBuilder.jsx` | The exercise-library + day-builder UI (stripped). |
| `ExerciseItem.jsx` | List item in the routine builder. |
| `BibliotecaCard.jsx` | Selectable exercise from the library. |

## What's recreated vs. omitted

✅ Sidebar layout, metric cards, alumna rows, drawer chrome with tabs, exercise list items, library grid, plantilla cards, badge styles, button styles.

⚠️ Stripped: full CRUD + Supabase, sortable drag-and-drop (UI shown, behaviour stubbed), the Make.com webhook automation, the full routine cycle/week/day matrix builder (a representative slice is shown), the JSON import/export tools.
