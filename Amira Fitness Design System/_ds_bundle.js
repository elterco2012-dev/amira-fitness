/* @ds-bundle: {"format":3,"namespace":"AmiraFitnessDesignSystem_1f167e","components":[],"sourceHashes":{"improvements/AlumnaMocks.jsx":"2d9174bd9df9","improvements/CanvasApp.jsx":"2209d97cb02a","improvements/Icons.jsx":"95a273b17011","improvements/PanelMocks.jsx":"784a7f34f861","improvements/design-canvas.jsx":"3b0e985041dd","ui_kits/alumna/AlumnaApp.jsx":"964103ed4c5b","ui_kits/alumna/Exercise.jsx":"e05984778bf2","ui_kits/alumna/Header.jsx":"711a3bb1191a","ui_kits/alumna/HomeBits.jsx":"a21fac638727","ui_kits/alumna/Screens.jsx":"28654b06f8c1","ui_kits/marketing/HeroNav.jsx":"778291b9d8f8","ui_kits/marketing/MarketingApp.jsx":"cb4214c100b3","ui_kits/marketing/Sections.jsx":"1d5f72e3dc35","ui_kits/panel/Dashboard.jsx":"d8adf5f39c35","ui_kits/panel/Drawer.jsx":"32ea771aa7db","ui_kits/panel/PanelApp.jsx":"644970eea882","ui_kits/panel/Sidebar.jsx":"bfba7cbbda4e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AmiraFitnessDesignSystem_1f167e = window.AmiraFitnessDesignSystem_1f167e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// improvements/AlumnaMocks.jsx
try { (() => {
/* global React, Icon */
const {
  useState
} = React;

// ─── Generic phone frame for mobile mockups ─────────────────────────────────
function Phone({
  children,
  theme = 'light',
  width = 380,
  height = 720,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": theme,
    style: {
      width,
      height,
      background: 'var(--bg)',
      borderRadius: 28,
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 18px 60px rgba(0,0,0,.10)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, children);
}
function PhoneHeader({
  name,
  sub,
  theme,
  icon
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--s)',
      borderBottom: '1px solid var(--b)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--vl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 13,
      color: 'var(--vd)'
    }
  }, "A"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--t)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)'
    }
  }, sub)), icon);
}

// ════════════════════════════════════════════════════════════════════════════
//  1. BOTTOM NAV — Emoji vs Lucide
// ════════════════════════════════════════════════════════════════════════════
function BottomNavBefore() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      borderTop: '1px solid var(--b)',
      display: 'flex'
    }
  }, [{
    e: '🏋️',
    l: 'Rutina',
    on: true
  }, {
    e: '📈',
    l: 'Progreso'
  }, {
    e: '💬',
    l: 'Notas'
  }, {
    e: '👤',
    l: 'Perfil'
  }].map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      flex: 1,
      padding: '10px 4px',
      background: 'none',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, it.e), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: it.on ? 'var(--v)' : 'var(--tm)',
      fontWeight: it.on ? 500 : 400
    }
  }, it.l))));
}
function BottomNavAfter() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      borderTop: '1px solid var(--b)',
      display: 'flex'
    }
  }, [{
    i: 'dumbbell',
    l: 'Rutina',
    on: true
  }, {
    i: 'trendup',
    l: 'Progreso'
  }, {
    i: 'msgsquare',
    l: 'Notas'
  }, {
    i: 'user',
    l: 'Perfil'
  }].map((it, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    style: {
      flex: 1,
      padding: '10px 4px',
      background: 'none',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.i,
    size: 20,
    stroke: it.on ? 'var(--v)' : 'var(--tm)',
    strokeWidth: it.on ? 2 : 1.6
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: it.on ? 'var(--v)' : 'var(--tm)',
      fontWeight: it.on ? 500 : 400
    }
  }, it.l))));
}

// ════════════════════════════════════════════════════════════════════════════
//  2. EXERCISE CARD — Crowded vs Refined
// ════════════════════════════════════════════════════════════════════════════
function ExCardBefore({
  done = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: done ? 'var(--vl)' : 'var(--s)',
      border: `1px solid ${done ? 'var(--vm)' : 'var(--b)'}`,
      borderRadius: 16,
      padding: '12px 14px',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: done ? 'var(--v)' : 'var(--s2)',
      border: `1px solid ${done ? 'var(--v)' : 'var(--bm)'}`,
      color: done ? 'white' : 'var(--tm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 500
    }
  }, done ? '✓' : '1'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--t)'
    }
  }, "Hollow Hold"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--tm)',
      marginTop: 2
    }
  }, "3 series \xB7 20-30\""))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      marginTop: 8,
      paddingTop: 8,
      borderTop: '1px solid var(--b)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--p)',
      border: 'none',
      borderRadius: 10,
      padding: '4px 10px',
      fontSize: 11,
      color: 'var(--pd)',
      fontWeight: 500
    }
  }, "\uD83D\uDCA1 Tip"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--rl)',
      border: 'none',
      borderRadius: 10,
      padding: '4px 10px',
      fontSize: 11,
      color: 'var(--rd)',
      fontWeight: 500
    }
  }, "\u25B6 Video"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--tm)',
      marginLeft: 'auto'
    }
  }, "kg"), /*#__PURE__*/React.createElement("input", {
    placeholder: "\u2014",
    style: {
      width: 44,
      padding: '3px 6px',
      border: '1px solid var(--bm)',
      borderRadius: 10,
      fontSize: 11,
      background: 'var(--s2)',
      textAlign: 'center'
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      marginTop: 8,
      background: done ? 'var(--vl)' : 'var(--s2)',
      border: `1px solid ${done ? 'var(--vm)' : 'var(--bm)'}`,
      borderRadius: 10,
      padding: '8px',
      fontSize: 12,
      color: done ? 'var(--vd)' : 'var(--tm)',
      fontWeight: 500
    }
  }, done ? '✓ Hecho' : 'Marcar como hecho'));
}
function ExCardAfter({
  done = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: `1px solid ${done ? 'var(--vm)' : 'var(--b)'}`,
      borderRadius: 14,
      padding: '12px 14px',
      marginBottom: 8,
      width: '100%',
      textAlign: 'left',
      position: 'relative',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: done ? 'var(--v)' : 'transparent',
      border: `1.5px solid ${done ? 'var(--v)' : 'var(--bm)'}`,
      color: done ? 'white' : 'var(--tm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 500,
      flexShrink: 0,
      transition: 'all .2s'
    }
  }, done ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2.5
  }) : '1'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--t)',
      textDecoration: done ? 'line-through' : 'none',
      opacity: done ? 0.55 : 1,
      marginBottom: 3
    }
  }, "Hollow Hold"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--tm)',
      background: 'var(--s2)',
      padding: '2px 7px',
      borderRadius: 99
    }
  }, "3\xD720-30\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "kg",
    style: {
      width: 44,
      padding: '5px 6px',
      border: '1px solid var(--bm)',
      borderRadius: 8,
      fontSize: 11,
      background: 'var(--s2)',
      textAlign: 'center',
      color: 'var(--t)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'transparent',
      border: '1px solid var(--b)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ad)'
    },
    title: "Tip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'transparent',
      border: '1px solid var(--b)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--tm)'
    },
    title: "Video"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 13,
    fill: "currentColor",
    stroke: "none"
  })))), done && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 14,
      fontSize: 9,
      background: 'var(--vl)',
      color: 'var(--vd)',
      borderRadius: 99,
      padding: '2px 7px',
      fontWeight: 600,
      letterSpacing: '.03em',
      textTransform: 'uppercase'
    }
  }, "Hecho"));
}

// ════════════════════════════════════════════════════════════════════════════
//  3. DAY TABS — Saturated vs Refined
// ════════════════════════════════════════════════════════════════════════════
function DayTabsBefore() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, [1, 2, 3].map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    style: {
      flex: 1,
      padding: '10px 4px',
      borderRadius: 30,
      fontSize: 12,
      fontWeight: 500,
      border: d === 2 ? '1px solid var(--v)' : '1px solid var(--bm)',
      background: d === 2 ? 'var(--v)' : 'var(--s)',
      color: d === 2 ? 'white' : 'var(--tm)'
    }
  }, "D\xEDa ", d)));
}
function DayTabsAfter() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      borderBottom: '1px solid var(--b)',
      paddingBottom: 0
    }
  }, [1, 2, 3].map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    style: {
      flex: 1,
      padding: '8px 4px 10px',
      borderRadius: '8px 8px 0 0',
      fontSize: 12,
      fontWeight: d === 2 ? 600 : 500,
      border: 'none',
      background: d === 2 ? 'var(--vl)' : 'transparent',
      color: d === 2 ? 'var(--vd)' : 'var(--tm)',
      position: 'relative',
      borderBottom: d === 2 ? '2px solid var(--v)' : '2px solid transparent',
      marginBottom: -1
    }
  }, "D\xEDa ", d)));
}

// ════════════════════════════════════════════════════════════════════════════
//  4. PROGRESS BAR — Thin/external vs Thick/inline
// ════════════════════════════════════════════════════════════════════════════
function ProgressBefore() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      color: 'var(--tm)',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", null, "5 de 8 ejercicios"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--vd)',
      fontWeight: 500
    }
  }, "62%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--b)',
      borderRadius: 99,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: 'var(--v)',
      width: '62%'
    }
  })));
}
function ProgressAfter() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28,
      background: 'var(--s2)',
      borderRadius: 99,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '62%',
      background: 'var(--v)',
      borderRadius: 99,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'white'
    }
  }, "5/8")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 11,
      color: 'var(--tm)',
      fontWeight: 500
    }
  }, "62%"));
}

// ════════════════════════════════════════════════════════════════════════════
//  5. HEADER + HOME hero — With hero card vs Without
// ════════════════════════════════════════════════════════════════════════════
function HomeBefore() {
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(PhoneHeader, {
    name: "Mar\xEDa \xB7 D\xEDa 2",
    sub: "Semana 2 \xB7 Ciclo 3",
    icon: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, "\uD83C\uDF19")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      overflow: 'hidden',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 16,
      padding: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--p)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 18,
      color: 'var(--pd)'
    }
  }, "M"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, "\xA1Hola Mar\xEDa!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--tm)'
    }
  }, "Cualquier molestia, avisame \uD83D\uDCAA"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--a)',
      borderRadius: 10,
      padding: '10px 14px',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 500,
      color: 'var(--ad)',
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      marginBottom: 4
    }
  }, "ENTRADA EN CALOR \xB7 5 MIN"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ad)',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: 'var(--ad)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--a)',
      fontSize: 8
    }
  }, "\u25B6"), "Ver entrada en calor")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--th)',
      textTransform: 'uppercase',
      letterSpacing: '.07em',
      marginBottom: 4
    }
  }, "SEMANA"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginBottom: 8,
      flexWrap: 'wrap'
    }
  }, [1, 2, 3, 4].map(w => /*#__PURE__*/React.createElement("button", {
    key: w,
    style: {
      padding: '4px 10px',
      borderRadius: 30,
      fontSize: 10,
      border: w === 2 ? 'none' : '1px solid var(--bm)',
      background: w === 2 ? 'var(--p)' : 'var(--s)',
      color: w === 2 ? 'var(--pd)' : 'var(--tm)',
      fontWeight: w === 2 ? 500 : 400
    }
  }, "S", w))), /*#__PURE__*/React.createElement(DayTabsBefore, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(ProgressBefore, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '.07em',
      margin: '10px 0 6px',
      fontWeight: 500
    }
  }, "EJERCICIOS DEL D\xCDA"), /*#__PURE__*/React.createElement(ExCardBefore, {
    done: true
  }), /*#__PURE__*/React.createElement(ExCardBefore, null)), /*#__PURE__*/React.createElement(BottomNavBefore, null));
}
function HomeAfter() {
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(PhoneHeader, {
    name: "Mar\xEDa \xB7 D\xEDa 2",
    sub: "Semana 2 \xB7 Ciclo 3",
    icon: /*#__PURE__*/React.createElement("button", {
      style: {
        background: 'transparent',
        border: '1px solid var(--b)',
        borderRadius: 8,
        padding: 6,
        color: 'var(--tm)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "moon",
      size: 14
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      overflow: 'hidden',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(DayTabsAfter, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(ProgressAfter, null)), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      background: 'var(--a)',
      border: 'none',
      borderRadius: 10,
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'rgba(99,56,6,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ad)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 13,
    fill: "currentColor",
    stroke: "none"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--ad)'
    }
  }, "Entrada en calor"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--ad)',
      opacity: .7
    }
  }, "5 minutos \xB7 antes de empezar")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 14,
    stroke: "var(--ad)"
  })), /*#__PURE__*/React.createElement(ExCardAfter, {
    done: true
  }), /*#__PURE__*/React.createElement(ExCardAfter, null)), /*#__PURE__*/React.createElement(BottomNavAfter, null));
}

// ════════════════════════════════════════════════════════════════════════════
//  6. NOTES SCREEN — Flat list vs Chat
// ════════════════════════════════════════════════════════════════════════════
function NotesBefore() {
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(PhoneHeader, {
    name: "Notas con Amira",
    sub: "3 mensajes",
    icon: null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      overflow: 'hidden',
      flex: 1,
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 14,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--tm)',
      marginBottom: 10,
      lineHeight: 1.5
    }
  }, "Dej\xE1 cualquier duda sobre la rutina. Amira la lee."), [{
    who: '👩 Amira',
    d: 'Mar 10',
    t: '¡Buen ritmo esta semana! Subí un poquito en sentadilla si te animás.'
  }, {
    who: 'Vos',
    d: 'Mar 12',
    t: 'Me costó el hollow hold, ¿hay alguna variante más simple?'
  }, {
    who: '👩 Amira',
    d: 'Mar 13',
    t: 'Sí, hacelo con rodillas flexionadas. Cuando lo hagas fluido, vamos a la versión completa 💪'
  }].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--s2)',
      borderRadius: 10,
      padding: '8px 10px',
      marginBottom: 6,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--th)',
      marginBottom: 3
    }
  }, n.who, " \xB7 ", n.d), n.t)))), /*#__PURE__*/React.createElement(BottomNavBefore, null));
}
function NotesAfter() {
  const msgs = [{
    from: 'amira',
    t: '¡Buen ritmo esta semana! Subí un poquito en sentadilla si te animás.',
    d: 'Mar 10'
  }, {
    from: 'alumna',
    t: 'Me costó el hollow hold, ¿hay alguna variante más simple?',
    d: 'Mar 12'
  }, {
    from: 'amira',
    t: 'Sí, hacelo con rodillas flexionadas en vez de piernas estiradas. Cuando lo hagas fluido, vamos a la versión completa 💪',
    d: 'Mar 13'
  }];
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(PhoneHeader, {
    name: "Notas con Amira",
    sub: "Respuesta en el d\xEDa",
    icon: null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      overflow: 'hidden',
      flex: 1,
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, msgs.map((m, i) => m.from === 'amira' ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      maxWidth: '80%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--vl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 11,
      color: 'var(--vd)',
      flexShrink: 0
    }
  }, "A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: '14px 14px 14px 4px',
      padding: '8px 12px',
      fontSize: 12,
      color: 'var(--t)',
      lineHeight: 1.5
    }
  }, m.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--th)',
      marginTop: 3,
      paddingLeft: 4
    }
  }, "Amira \xB7 ", m.d))) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '80%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--vl)',
      borderRadius: '14px 14px 4px 14px',
      padding: '8px 12px',
      fontSize: 12,
      color: 'var(--vd)',
      lineHeight: 1.5
    }
  }, m.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--th)',
      marginTop: 3,
      paddingRight: 4,
      textAlign: 'right'
    }
  }, m.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      gap: 6,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Escribir\u2026",
    style: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid var(--bm)',
      borderRadius: 99,
      fontSize: 12,
      background: 'var(--s2)',
      color: 'var(--t)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--v)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 14
  })))), /*#__PURE__*/React.createElement(BottomNavAfter, null));
}
Object.assign(window, {
  Phone,
  BottomNavBefore,
  BottomNavAfter,
  ExCardBefore,
  ExCardAfter,
  DayTabsBefore,
  DayTabsAfter,
  ProgressBefore,
  ProgressAfter,
  HomeBefore,
  HomeAfter,
  NotesBefore,
  NotesAfter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "improvements/AlumnaMocks.jsx", error: String((e && e.message) || e) }); }

// improvements/CanvasApp.jsx
try { (() => {
/* global React, DesignCanvas, DCSection, DCArtboard, HomeBefore, HomeAfter, NotesBefore, NotesAfter, BottomNavBefore, BottomNavAfter, ExCardBefore, ExCardAfter, DayTabsBefore, DayTabsAfter, ProgressBefore, ProgressAfter, PanelBefore, PanelAfter, SidebarBefore, SidebarAfter, MetricBefore, MetricAfter, LoginBefore, LoginAfter, DrawerBefore, DrawerAfter */

function Card({
  children,
  padding = 18,
  width,
  height,
  bg = 'var(--bg)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": "light",
    style: {
      width,
      height,
      padding,
      background: bg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, children);
}
function ImprovementsApp() {
  return /*#__PURE__*/React.createElement(DesignCanvas, {
    title: "Amira Fitness \u2014 Antes / Despu\xE9s",
    subtitle: "Diez cambios concretos por superficie. Click en cualquier mockup para verlo en pantalla completa."
  }, /*#__PURE__*/React.createElement(DCSection, {
    id: "panel-full",
    title: "\uD83D\uDDA5\uFE0F Panel \xB7 La primera impresi\xF3n"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "panel-before",
    label: "Antes \u2014 emoji + 'Conectado \xB7 Supabase' + tab pint\xF3n",
    width: 980,
    height: 620
  }, /*#__PURE__*/React.createElement(PanelBefore, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "panel-after",
    label: "Despu\xE9s \u2014 Lucide + barra activa + tabla con \xFAltima actividad",
    width: 980,
    height: 620
  }, /*#__PURE__*/React.createElement(PanelAfter, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "alumna-home",
    title: "\uD83D\uDCF1 Alumna \xB7 Home de la rutina"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "home-before",
    label: "Antes \u2014 hero card redundante + UI con emoji",
    width: 380,
    height: 720
  }, /*#__PURE__*/React.createElement(HomeBefore, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "home-after",
    label: "Despu\xE9s \u2014 sin hero, iconos Lucide, exercise card m\xE1s limpia",
    width: 380,
    height: 720
  }, /*#__PURE__*/React.createElement(HomeAfter, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "alumna-notas",
    title: "\uD83D\uDCAC Alumna \xB7 Notas con Amira"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "notas-before",
    label: "Antes \u2014 lista plana, mensajes uniformes",
    width: 380,
    height: 720
  }, /*#__PURE__*/React.createElement(NotesBefore, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "notas-after",
    label: "Despu\xE9s \u2014 chat real, bubbles diferenciados",
    width: 380,
    height: 720
  }, /*#__PURE__*/React.createElement(NotesAfter, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "bottom-nav",
    title: "Componente \xB7 Bottom nav"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "bn-before",
    label: "Antes \u2014 emoji",
    width: 400,
    height: 120
  }, /*#__PURE__*/React.createElement(Card, {
    width: 400,
    height: 120,
    bg: "#e8e8e6",
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,.06)'
    }
  }, /*#__PURE__*/React.createElement(BottomNavBefore, null)))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "bn-after",
    label: "Despu\xE9s \u2014 Lucide",
    width: 400,
    height: 120
  }, /*#__PURE__*/React.createElement(Card, {
    width: 400,
    height: 120,
    bg: "#e8e8e6",
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,.06)'
    }
  }, /*#__PURE__*/React.createElement(BottomNavAfter, null))))), /*#__PURE__*/React.createElement(DCSection, {
    id: "exercise",
    title: "Componente \xB7 Exercise card"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ex-before",
    label: "Antes \u2014 5 controles, bot\xF3n 'Marcar' full-width",
    width: 420,
    height: 300
  }, /*#__PURE__*/React.createElement(Card, {
    width: 420,
    height: 300
  }, /*#__PURE__*/React.createElement(ExCardBefore, null), /*#__PURE__*/React.createElement(ExCardBefore, {
    done: true
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ex-after",
    label: "Despu\xE9s \u2014 tap entero, iconos, peso inline, done sutil",
    width: 420,
    height: 240
  }, /*#__PURE__*/React.createElement(Card, {
    width: 420,
    height: 240
  }, /*#__PURE__*/React.createElement(ExCardAfter, null), /*#__PURE__*/React.createElement(ExCardAfter, {
    done: true
  })))), /*#__PURE__*/React.createElement(DCSection, {
    id: "day-progress",
    title: "Componente \xB7 Day tabs + progress"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "dp-before",
    label: "Antes \u2014 tabs verdes saturadas + progress text-arriba",
    width: 400,
    height: 180
  }, /*#__PURE__*/React.createElement(Card, {
    width: 400,
    height: 180
  }, /*#__PURE__*/React.createElement(DayTabsBefore, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(ProgressBefore, null)))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "dp-after",
    label: "Despu\xE9s \u2014 tabs sutiles + progress con n\xFAmero adentro",
    width: 400,
    height: 180
  }, /*#__PURE__*/React.createElement(Card, {
    width: 400,
    height: 180
  }, /*#__PURE__*/React.createElement(DayTabsAfter, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(ProgressAfter, null))))), /*#__PURE__*/React.createElement(DCSection, {
    id: "sidebar",
    title: "Componente \xB7 Sidebar del panel"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sb-before",
    label: "Antes \u2014 emoji + tab pint\xF3n verde claro + Supabase footer",
    width: 260,
    height: 520
  }, /*#__PURE__*/React.createElement(Card, {
    width: 260,
    height: 520,
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 520,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(SidebarBefore, null)))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sb-after",
    label: "Despu\xE9s \u2014 Lucide + barra lateral verde + footer limpio",
    width: 260,
    height: 520
  }, /*#__PURE__*/React.createElement(Card, {
    width: 260,
    height: 520,
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 520,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(SidebarAfter, null))))), /*#__PURE__*/React.createElement(DCSection, {
    id: "metrics",
    title: "Componente \xB7 M\xE9tricas del dashboard"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "m-before",
    label: "Antes \u2014 n\xFAmero grande, sin contexto",
    width: 680,
    height: 140
  }, /*#__PURE__*/React.createElement(Card, {
    width: 680,
    height: 140
  }, /*#__PURE__*/React.createElement(MetricBefore, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "m-after",
    label: "Despu\xE9s \u2014 delta + sparkline tenue",
    width: 680,
    height: 160
  }, /*#__PURE__*/React.createElement(Card, {
    width: 680,
    height: 160
  }, /*#__PURE__*/React.createElement(MetricAfter, null)))), /*#__PURE__*/React.createElement(DCSection, {
    id: "login",
    title: "Componente \xB7 Login del panel"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "login-before",
    label: "Antes \u2014 un input gen\xE9rico",
    width: 480,
    height: 360
  }, /*#__PURE__*/React.createElement(Card, {
    width: 480,
    height: 360
  }, /*#__PURE__*/React.createElement(LoginBefore, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "login-after",
    label: "Despu\xE9s \u2014 email + password + 'Hola Amira' con foto",
    width: 480,
    height: 420
  }, /*#__PURE__*/React.createElement(Card, {
    width: 480,
    height: 420
  }, /*#__PURE__*/React.createElement(LoginAfter, null)))), /*#__PURE__*/React.createElement(DCSection, {
    id: "drawer",
    title: "Componente \xB7 Drawer header de la alumna"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "dr-before",
    label: "Antes \u2014 solo X de cerrar",
    width: 520,
    height: 240
  }, /*#__PURE__*/React.createElement(Card, {
    width: 520,
    height: 240
  }, /*#__PURE__*/React.createElement(DrawerBefore, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "dr-after",
    label: "Despu\xE9s \u2014 overflow menu, badge de estado, indicador de actividad",
    width: 520,
    height: 240
  }, /*#__PURE__*/React.createElement(Card, {
    width: 520,
    height: 240
  }, /*#__PURE__*/React.createElement(DrawerAfter, null)))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ImprovementsApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "improvements/CanvasApp.jsx", error: String((e && e.message) || e) }); }

// improvements/Icons.jsx
try { (() => {
/* global React */
// Minimal Lucide-style icon set (stroke 1.75, lineCap round) — only what we need.

const ICONS = {
  home: 'M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  clipboard: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v0z M9 12h6 M9 16h4',
  library: 'M3 6v15 M21 6v15 M3 6c2-1 5-1 9-1s7 0 9 1 M3 11c2-1 5-1 9-1s7 0 9 1 M3 16c2-1 5-1 9-1s7 0 9 1',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
  msgcircle: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  msgsquare: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  dumbbell: 'M6.5 6.5L17.5 17.5 M21 14.5L18.5 17 M14.5 21L17 18.5 M3 9.5L5.5 7 M9.5 3L7 5.5 M19.5 8.5l1-1a1.5 1.5 0 0 0-2.12-2.12l-1 1 M5.62 18.38l-1 1a1.5 1.5 0 0 1-2.12-2.12l1-1',
  trendup: 'M23 6L13.5 15.5 8.5 10.5 1 18 M17 6h6v6',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42',
  play: 'M5 3l14 9-14 9V3z',
  playcircle: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M10 8l6 4-6 4V8z',
  lightbulb: 'M9 18h6 M10 22h4 M15.09 14a6 6 0 1 0-6.18 0c.8.49 1.31 1.13 1.59 1.83A1 1 0 0 0 11.41 17h1.18a1 1 0 0 0 .92-1.17c.28-.7.79-1.34 1.58-1.83z',
  x: 'M18 6L6 18 M6 6l12 12',
  more: 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
  check: 'M20 6L9 17l-5-5',
  chevron: 'M9 18l6-6-6-6',
  send: 'M22 2L11 13 M22 2L15 22l-4-9-9-4 20-7z',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
  calendar: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18'
};
function Icon({
  name,
  size = 18,
  stroke = 'currentColor',
  strokeWidth = 1.75,
  fill = 'none',
  style
}) {
  const paths = (ICONS[name] || '').split(' M').map((p, i) => i === 0 ? p : 'M' + p);
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style,
    "aria-hidden": true
  }, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}
Object.assign(window, {
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "improvements/Icons.jsx", error: String((e && e.message) || e) }); }

// improvements/PanelMocks.jsx
try { (() => {
/* global React, Icon */

// ─── Desktop frame ─────────────────────────────────────────────────────────
function Desktop({
  children,
  width = 980,
  height = 620,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": "light",
    style: {
      width,
      height,
      background: 'var(--bg)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 18px 60px rgba(0,0,0,.10)',
      display: 'flex',
      ...style
    }
  }, children);
}

// ════════════════════════════════════════════════════════════════════════════
//  1. SIDEBAR — Emoji + filled-active vs Lucide + edge-bar-active
// ════════════════════════════════════════════════════════════════════════════
function SidebarBefore() {
  const items = [{
    sec: 'PRINCIPAL'
  }, {
    e: '🏠',
    l: 'Inicio'
  }, {
    e: '👥',
    l: 'Alumnas',
    on: true,
    badge: 3
  }, {
    e: '📋',
    l: 'Rutinas'
  }, {
    e: '📚',
    l: 'Biblioteca'
  }, {
    sec: 'GESTIÓN'
  }, {
    e: '📝',
    l: 'Registros'
  }, {
    e: '💬',
    l: 'Mensajes'
  }, {
    e: '⚙️',
    l: 'Configuración'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 220,
      background: 'var(--s)',
      borderRight: '1px solid var(--b)',
      padding: '18px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 18,
      padding: '0 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'var(--vl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 13,
      color: 'var(--vd)'
    }
  }, "A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500
    }
  }, "Amira Fitness"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)'
    }
  }, "Panel \xB7 Profesora"))), items.map((it, i) => it.sec ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 9,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--th)',
      padding: '6px 9px 3px',
      marginTop: 6
    }
  }, it.sec) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 9px',
      borderRadius: 10,
      fontSize: 12,
      color: it.on ? 'var(--vd)' : 'var(--tm)',
      background: it.on ? 'var(--vl)' : 'transparent',
      fontWeight: it.on ? 500 : 400
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      textAlign: 'center',
      fontSize: 13
    }
  }, it.e), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.l), it.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--rd)',
      color: 'white',
      borderRadius: 99,
      fontSize: 9,
      padding: '1px 5px'
    }
  }, it.badge))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 12,
      borderTop: '1px solid var(--b)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 9px',
      fontSize: 10,
      color: 'var(--tm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--v)'
    }
  }), "Conectado \xB7 Supabase"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--th)',
      padding: '0 9px'
    }
  }, "v1.4.0")));
}
function SidebarAfter() {
  const items = [{
    sec: 'PRINCIPAL'
  }, {
    i: 'home',
    l: 'Inicio'
  }, {
    i: 'users',
    l: 'Alumnas',
    on: true,
    badge: 3
  }, {
    i: 'clipboard',
    l: 'Rutinas'
  }, {
    i: 'library',
    l: 'Biblioteca'
  }, {
    sec: 'GESTIÓN'
  }, {
    i: 'inbox',
    l: 'Registros'
  }, {
    i: 'msgcircle',
    l: 'Mensajes'
  }, {
    i: 'settings',
    l: 'Configuración'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 220,
      background: 'var(--s)',
      borderRight: '1px solid var(--b)',
      padding: '18px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 18,
      padding: '0 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'var(--vl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 13,
      color: 'var(--vd)'
    }
  }, "A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "Amira Fitness"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)'
    }
  }, "Panel \xB7 Profesora"))), items.map((it, i) => it.sec ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 10,
      letterSpacing: '.8px',
      textTransform: 'uppercase',
      color: 'var(--tm)',
      padding: '12px 11px 4px',
      marginTop: 4,
      fontWeight: 500
    }
  }, it.sec) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 11px',
      borderRadius: 8,
      fontSize: 13,
      color: it.on ? 'var(--t)' : 'var(--tm)',
      fontWeight: it.on ? 500 : 400,
      position: 'relative',
      background: it.on ? 'var(--s2)' : 'transparent'
    }
  }, it.on && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -10,
      top: 6,
      bottom: 6,
      width: 3,
      background: 'var(--v)',
      borderRadius: '0 3px 3px 0'
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: it.i,
    size: 15,
    stroke: it.on ? 'var(--v)' : 'var(--tm)',
    strokeWidth: it.on ? 2 : 1.6
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.l), it.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--rd)',
      color: 'white',
      borderRadius: 99,
      fontSize: 9,
      padding: '1px 6px',
      fontWeight: 600
    }
  }, it.badge))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 10,
      borderTop: '1px solid var(--b)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 11px',
      fontSize: 10,
      color: 'var(--tm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--v)'
    }
  }), "Sincronizado")));
}

// ════════════════════════════════════════════════════════════════════════════
//  2. ALUMNAS LIST — Plain vs Search+activity
// ════════════════════════════════════════════════════════════════════════════
const ROWS = [{
  n: 'María González',
  s: 'Gimnasio · 3 días/sem · Ciclo 3',
  av: 'teal',
  est: 'Activa',
  last: 'hace 2h'
}, {
  n: 'Lucía Pérez',
  s: 'Casa · 4 días/sem · Ciclo 2',
  av: 'purple',
  est: 'Activa',
  last: 'ayer'
}, {
  n: 'Sofía Martínez',
  s: 'Gimnasio · 5 días/sem · Ciclo 5',
  av: 'amber',
  est: 'Activa',
  last: 'hace 3h'
}, {
  n: 'Camila Ruiz',
  s: 'Casa · 2 días/sem · Ciclo 1',
  av: 'coral',
  est: 'Pausada',
  last: 'hace 8 días',
  stale: true
}, {
  n: 'Valentina Sosa',
  s: 'Gimnasio · 3 días/sem · Ciclo 4',
  av: 'teal',
  est: 'Activa',
  last: 'hace 5h'
}];
const AV_BG = {
  teal: {
    bg: 'var(--vl)',
    fg: 'var(--vd)'
  },
  purple: {
    bg: 'var(--p)',
    fg: 'var(--pd)'
  },
  amber: {
    bg: 'var(--a)',
    fg: 'var(--ad)'
  },
  coral: {
    bg: 'var(--co)',
    fg: 'var(--cod)'
  }
};
function AlumnasBefore() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '24px 28px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: '1.5rem',
      marginBottom: 14
    }
  }, "Alumnas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5
    }
  }, ['Todas', 'Activa', 'Pausada', 'Pendiente'].map((f, i) => /*#__PURE__*/React.createElement("button", {
    key: f,
    style: {
      padding: '5px 13px',
      borderRadius: 30,
      fontSize: 11,
      border: i === 0 ? 'none' : '1px solid var(--bm)',
      background: i === 0 ? 'var(--p)' : 'var(--s)',
      color: i === 0 ? 'var(--pd)' : 'var(--tm)',
      fontWeight: i === 0 ? 500 : 400
    }
  }, f))), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--v)',
      color: 'white',
      borderRadius: 30,
      padding: '7px 16px',
      fontSize: 12,
      border: 'none',
      fontWeight: 500
    }
  }, "+ Nueva alumna")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 14,
      padding: '0 18px'
    }
  }, ROWS.slice(0, 4).map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 0',
      borderBottom: i < 3 ? '1px solid var(--b)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      ...AV_BG[r.av],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 14,
      color: AV_BG[r.av].fg
    }
  }, r.n[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: AV_BG[r.av].fg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--t)'
    }
  }, r.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)'
    }
  }, r.s)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      padding: '2px 8px',
      borderRadius: 30,
      fontWeight: 500,
      background: r.est === 'Activa' ? 'var(--vl)' : 'var(--p)',
      color: r.est === 'Activa' ? 'var(--vd)' : 'var(--pd)'
    }
  }, r.est)))));
}
function AlumnasAfter() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '24px 28px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: '1.6rem',
      marginBottom: 2
    }
  }, "Alumnas"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--tm)'
    }
  }, "12 activas \xB7 3 pendientes \xB7 1 pausada")), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--v)',
      color: 'white',
      borderRadius: 8,
      padding: '8px 14px',
      fontSize: 12,
      border: 'none',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, "+ Nueva alumna")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 14,
    stroke: "var(--tm)",
    style: {
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar alumna\u2026",
    style: {
      width: '100%',
      padding: '8px 12px 8px 32px',
      border: '1px solid var(--bm)',
      borderRadius: 8,
      fontSize: 12,
      background: 'var(--s)',
      color: 'var(--t)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, ['Todas', 'Activa', 'Pausada'].map((f, i) => /*#__PURE__*/React.createElement("button", {
    key: f,
    style: {
      padding: '6px 11px',
      borderRadius: 8,
      fontSize: 11,
      border: '1px solid var(--bm)',
      background: i === 0 ? 'var(--t)' : 'var(--s)',
      color: i === 0 ? 'white' : 'var(--tm)',
      fontWeight: i === 0 ? 500 : 400
    }
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '40px 1fr 110px 80px',
      gap: 10,
      padding: '8px 16px',
      background: 'var(--s2)',
      fontSize: 9,
      fontWeight: 600,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '.05em'
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, "Alumna"), /*#__PURE__*/React.createElement("div", null, "\xDAltima actividad"), /*#__PURE__*/React.createElement("div", null, "Estado")), ROWS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '40px 1fr 110px 80px',
      gap: 10,
      padding: '11px 16px',
      borderTop: '1px solid var(--b)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      ...AV_BG[r.av],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 13,
      color: AV_BG[r.av].fg
    }
  }, r.n[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--t)'
    }
  }, r.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)',
      marginTop: 1
    }
  }, r.s)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: r.stale ? 'var(--rd)' : 'var(--tm)',
      fontWeight: r.stale ? 500 : 400
    }
  }, r.stale && '⚠ ', r.last), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      padding: '3px 8px',
      borderRadius: 99,
      fontWeight: 600,
      background: r.est === 'Activa' ? 'var(--vl)' : 'var(--p)',
      color: r.est === 'Activa' ? 'var(--vd)' : 'var(--pd)',
      justifySelf: 'start'
    }
  }, r.est)))));
}

// ════════════════════════════════════════════════════════════════════════════
//  3. FULL PANEL — Before / After (sidebar + main combined)
// ════════════════════════════════════════════════════════════════════════════
function PanelBefore() {
  return /*#__PURE__*/React.createElement(Desktop, null, /*#__PURE__*/React.createElement(SidebarBefore, null), /*#__PURE__*/React.createElement(AlumnasBefore, null));
}
function PanelAfter() {
  return /*#__PURE__*/React.createElement(Desktop, null, /*#__PURE__*/React.createElement(SidebarAfter, null), /*#__PURE__*/React.createElement(AlumnasAfter, null));
}

// ════════════════════════════════════════════════════════════════════════════
//  4. METRIC CARD — Static number vs Trend + sparkline
// ════════════════════════════════════════════════════════════════════════════
function MetricBefore() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10
    }
  }, [['Alumnas activas', '12', true], ['Pendientes', '3'], ['Esta semana', '84%', true], ['Sin leer', '5']].map(([l, v, g], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 10,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)',
      marginBottom: 4
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: '1.8rem',
      color: g ? 'var(--vd)' : 'var(--t)',
      lineHeight: 1
    }
  }, v))));
}
function MetricAfter() {
  const data = [{
    l: 'Alumnas activas',
    v: '12',
    d: '+2 esta semana',
    g: true,
    spark: [3, 5, 4, 7, 8, 9, 10, 12]
  }, {
    l: 'Pendientes',
    v: '3',
    d: 'sin cambio',
    spark: [3, 4, 2, 3, 3, 4, 3, 3]
  }, {
    l: 'Adherencia',
    v: '84%',
    d: '+6% vs últ. sem',
    g: true,
    spark: [70, 72, 75, 80, 78, 81, 84, 84]
  }, {
    l: 'Sin leer',
    v: '5',
    d: '−2 desde ayer',
    g: true,
    spark: [9, 8, 8, 7, 6, 7, 7, 5]
  }];
  function Sparkline({
    pts,
    color
  }) {
    const max = Math.max(...pts),
      min = Math.min(...pts),
      range = max - min || 1;
    const w = 80,
      h = 26;
    const path = pts.map((p, i) => `${i / (pts.length - 1) * w},${h - (p - min) / range * h}`).join(' L ');
    return /*#__PURE__*/React.createElement("svg", {
      width: w,
      height: h,
      viewBox: `0 0 ${w} ${h}`,
      style: {
        position: 'absolute',
        right: 12,
        top: 14,
        opacity: .25
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: `M ${path}`,
      stroke: color,
      strokeWidth: "1.5",
      fill: "none"
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10
    }
  }, data.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 12,
      padding: '14px 16px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    pts: m.spark,
    color: m.g ? 'var(--v)' : 'var(--tm)'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)',
      marginBottom: 4,
      fontWeight: 500
    }
  }, m.l), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: '1.8rem',
      color: m.g ? 'var(--vd)' : 'var(--t)',
      lineHeight: 1,
      marginBottom: 4
    }
  }, m.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: m.g ? 'var(--vd)' : 'var(--tm)',
      fontWeight: 500
    }
  }, m.d))));
}

// ════════════════════════════════════════════════════════════════════════════
//  5. LOGIN — One password vs Real login
// ════════════════════════════════════════════════════════════════════════════
function LoginBefore() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      padding: 40,
      background: 'var(--s)',
      borderRadius: 14,
      border: '1px solid var(--b)',
      textAlign: 'center',
      boxShadow: '0 8px 30px rgba(0,0,0,.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--vl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 22,
      color: 'var(--vd)',
      margin: '0 auto 16px'
    }
  }, "A"), /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '1.4rem',
      marginBottom: 4
    }
  }, "Panel de Amira"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--tm)',
      marginBottom: 20
    }
  }, "Ingres\xE1 tu contrase\xF1a para continuar"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Contrase\xF1a",
    style: {
      width: '100%',
      padding: '10px 14px',
      border: '1px solid var(--bm)',
      borderRadius: 10,
      fontSize: 13,
      background: 'var(--s2)',
      marginBottom: 10,
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      padding: 10,
      background: 'var(--v)',
      color: 'white',
      borderRadius: 10,
      fontSize: 13,
      fontWeight: 500,
      border: 'none'
    }
  }, "Entrar"));
}
function LoginAfter() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      padding: 36,
      background: 'var(--s)',
      borderRadius: 14,
      border: '1px solid var(--b)',
      boxShadow: '0 8px 30px rgba(0,0,0,.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/foto-amira.jpg",
    alt: "",
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      objectFit: 'cover',
      objectPosition: 'center 70%'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '1.4rem',
      lineHeight: 1,
      marginBottom: 4
    }
  }, "Hola, Amira"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--tm)'
    }
  }, "Bienvenida de vuelta"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: 'var(--tm)',
      display: 'block',
      marginBottom: 5,
      fontWeight: 500
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    value: "amira@amirafitness.com",
    readOnly: true,
    style: {
      width: '100%',
      padding: '9px 12px',
      border: '1px solid var(--bm)',
      borderRadius: 8,
      fontSize: 12,
      background: 'var(--s2)',
      color: 'var(--t)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: 'var(--tm)',
      fontWeight: 500
    }
  }, "Contrase\xF1a"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: 11,
      color: 'var(--v)',
      textDecoration: 'none',
      fontWeight: 500
    }
  }, "\xBFOlvidaste tu contrase\xF1a?")), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: "\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF",
    readOnly: true,
    style: {
      width: '100%',
      padding: '9px 12px',
      border: '1px solid var(--bm)',
      borderRadius: 8,
      fontSize: 12,
      background: 'var(--s2)',
      color: 'var(--t)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
      fontSize: 12,
      color: 'var(--tm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      background: 'var(--v)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 11,
    strokeWidth: 3
  })), "Mantenerme conectada"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      padding: '11px',
      background: 'var(--v)',
      color: 'white',
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      border: 'none'
    }
  }, "Entrar al panel"));
}

// ════════════════════════════════════════════════════════════════════════════
//  6. DRAWER HEADER — Plain vs Overflow menu + photo avatar
// ════════════════════════════════════════════════════════════════════════════
function DrawerBefore() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 480,
      background: 'var(--s)',
      borderRadius: 14,
      overflow: 'hidden',
      border: '1px solid var(--b)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px 0',
      borderBottom: '1px solid var(--b)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: '50%',
      background: 'var(--vl)',
      color: 'var(--vd)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 18
    }
  }, "M"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: '1.2rem'
    }
  }, "Mar\xEDa Gonz\xE1lez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--tm)',
      marginTop: 1
    }
  }, "Gimnasio \xB7 3 d\xEDas/sem \xB7 Ciclo 3"))), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      fontSize: 16,
      color: 'var(--tm)',
      padding: 2
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, ['Rutina', 'Datos', 'Historial', 'Notas', 'Link'].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: '8px 12px',
      fontSize: 11,
      color: i === 0 ? 'var(--v)' : 'var(--tm)',
      fontWeight: i === 0 ? 600 : 400,
      borderBottom: i === 0 ? '2px solid var(--v)' : '2px solid transparent',
      marginBottom: -1
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      fontSize: 12,
      color: 'var(--tm)',
      minHeight: 60
    }
  }, "Contenido del drawer \u2026"));
}
function DrawerAfter() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 480,
      background: 'var(--s)',
      borderRadius: 14,
      overflow: 'hidden',
      border: '1px solid var(--b)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px 0',
      borderBottom: '1px solid var(--b)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: '50%',
      background: 'var(--vl)',
      color: 'var(--vd)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 18
    }
  }, "M"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "serif",
    style: {
      fontSize: '1.2rem'
    }
  }, "Mar\xEDa Gonz\xE1lez"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      padding: '2px 7px',
      borderRadius: 99,
      background: 'var(--vl)',
      color: 'var(--vd)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.05em'
    }
  }, "Activa")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--tm)',
      marginTop: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, "Gimnasio \xB7 3 d\xEDas"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Ciclo 3 \xB7 Semana 2"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--vd)'
    }
  }, "\u25CF hace 2h")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: '1px solid var(--b)',
      borderRadius: 8,
      padding: 6,
      color: 'var(--tm)',
      display: 'flex'
    },
    title: "M\xE1s"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: '1px solid var(--b)',
      borderRadius: 8,
      padding: 6,
      color: 'var(--tm)',
      display: 'flex'
    },
    title: "Cerrar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, ['Rutina', 'Datos', 'Historial', 'Notas', 'Link'].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: '8px 12px',
      fontSize: 11,
      color: i === 0 ? 'var(--v)' : 'var(--tm)',
      fontWeight: i === 0 ? 600 : 500,
      borderBottom: i === 0 ? '2px solid var(--v)' : '2px solid transparent',
      marginBottom: -1
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      fontSize: 12,
      color: 'var(--tm)',
      minHeight: 60
    }
  }, "Contenido del drawer \u2026"));
}
Object.assign(window, {
  Desktop,
  SidebarBefore,
  SidebarAfter,
  AlumnasBefore,
  AlumnasAfter,
  PanelBefore,
  PanelAfter,
  MetricBefore,
  MetricAfter,
  LoginBefore,
  LoginAfter,
  DrawerBefore,
  DrawerAfter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "improvements/PanelMocks.jsx", error: String((e && e.message) || e) }); }

// improvements/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "improvements/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alumna/AlumnaApp.jsx
try { (() => {
/* global React, Header, BottomNav, WarmupCard, WeekChips, DayTabs, ProgressBar, ExerciseCard, Timer, CelebrationModal, ProgressScreen, NotesScreen */
const {
  useState,
  useEffect
} = React;
const SEED = [{
  nombre: 'Hollow Hold',
  series: '3',
  reps: '20-30"',
  tip: 'Espalda baja siempre apoyada. Si se despega, flexioná rodillas.',
  video: 'https://youtube.com/shorts/o-XW-38ni2s'
}, {
  nombre: 'Crunch sobre esfera',
  series: '3',
  reps: '15',
  tip: 'Movimiento controlado, no tires del cuello. Activá abdomen.',
  video: 'https://youtube.com/shorts/4sORVXlsRog'
}, {
  nombre: 'Plancha con toque de hombros',
  series: '3',
  reps: '20',
  tip: 'Evitá que la cadera se mueva. Activá abdomen.',
  video: 'https://youtube.com/shorts/tzOH2YzP8QI'
}, {
  nombre: 'Cuádriceps a una pierna',
  series: '3',
  reps: '10 c/lado',
  tip: 'Movimiento controlado, sin impulso.',
  video: 'https://youtube.com/shorts/AcnKSxfj4ng'
}, {
  nombre: 'Sentadilla al cajón',
  series: '3',
  reps: '10',
  tip: 'Bajá controlado, peso en talones.',
  video: 'https://youtube.com/shorts/ASCwv9H6A4U'
}, {
  nombre: 'Isquiotibiales',
  series: '3',
  reps: '10',
  tip: 'Poca carga. Subí y bajá controlado.',
  video: 'https://youtube.com/shorts/B6t8MvbTtew'
}, {
  nombre: 'Vuelos laterales',
  series: '3',
  reps: '10',
  tip: 'No subas más allá de los hombros.',
  video: 'https://youtube.com/shorts/VbS0cyfH2mk'
}, {
  nombre: 'Vuelos frontales',
  series: '3',
  reps: '10',
  tip: 'Movimiento controlado, sin balanceo.',
  video: 'https://youtube.com/shorts/YyWAmeBkVgg'
}];
function AlumnaApp() {
  const [theme, setTheme] = useState('light');
  const [tab, setTab] = useState('rutina');
  const [week, setWeek] = useState(2);
  const [day, setDay] = useState(2);
  const [done, setDone] = useState({});
  const [timerOn, setTimerOn] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  function toggleEx(i) {
    setDone(d => {
      const next = {
        ...d,
        [i]: !d[i]
      };
      // celebrate when all done
      const allDone = SEED.every((_, idx) => next[idx]);
      if (allDone && !d[i]) {
        setTimeout(() => setCelebrate(true), 250);
      }
      // start timer briefly when checking off
      if (next[i]) {
        setTimerOn(true);
        setTimeout(() => setTimerOn(false), 4500);
      }
      return next;
    });
  }
  const doneCount = SEED.reduce((n, _, i) => n + (done[i] ? 1 : 0), 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 430,
      margin: '0 auto',
      paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom,0px))',
      background: 'var(--bg)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    theme: theme,
    onToggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '1rem 1.25rem'
    }
  }, tab === 'rutina' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(WarmupCard, null), /*#__PURE__*/React.createElement(WeekChips, {
    weeks: [1, 2, 3, 4],
    value: week,
    onChange: setWeek
  }), /*#__PURE__*/React.createElement(DayTabs, {
    days: [1, 2, 3],
    value: day,
    onChange: setDay
  }), /*#__PURE__*/React.createElement(ProgressBar, {
    done: doneCount,
    total: SEED.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 500,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      marginBottom: '0.6rem'
    }
  }, "Ejercicios del d\xEDa"), SEED.map((ej, i) => /*#__PURE__*/React.createElement(ExerciseCard, {
    key: ej.nombre,
    num: i + 1,
    ej: ej,
    done: !!done[i],
    onToggle: () => toggleEx(i),
    onWeight: () => {}
  }))), tab === 'progreso' && /*#__PURE__*/React.createElement(ProgressScreen, null), tab === 'notas' && /*#__PURE__*/React.createElement(NotesScreen, null), tab === 'perfil' && /*#__PURE__*/React.createElement(ProfileScreen, null)), /*#__PURE__*/React.createElement(Timer, {
    show: timerOn,
    onSkip: () => setTimerOn(false)
  }), /*#__PURE__*/React.createElement(BottomNav, {
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement(CelebrationModal, {
    show: celebrate,
    onClose: () => setCelebrate(false)
  }));
}
function Hero() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 'var(--r)',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--p)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 19,
      color: 'var(--pd)'
    }
  }, "M"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      marginBottom: 2,
      color: 'var(--t)'
    }
  }, "\xA1Hola Mar\xEDa!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: 'var(--tm)'
    }
  }, "Cualquier molestia, avisame enseguida \uD83D\uDCAA")));
}
function ProfileScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '1.4rem',
      marginBottom: '0.85rem'
    }
  }, "Tu perfil"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 'var(--r)',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      height: 80,
      borderRadius: '50%',
      background: 'var(--p)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Serif Display',serif",
      fontSize: 32,
      color: 'var(--pd)'
    }
  }, "M"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 500
    }
  }, "Mar\xEDa Gonz\xE1lez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--tm)'
    }
  }, "Empez\xF3 el 1 de Marzo, 2025"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 'var(--r)',
      padding: '1rem'
    }
  }, [['Tipo de entrenamiento', 'Gimnasio'], ['Días por semana', '3'], ['Ciclo actual', 'Ciclo 3 · Semana 2'], ['Próxima revisión', 'Domingo']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid var(--b)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--tm)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--t)',
      fontWeight: 500
    }
  }, v)))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(AlumnaApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alumna/AlumnaApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alumna/Exercise.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ─── ExerciseCard ──────────────────────────────────────────────────────────
function ExerciseCard({
  num,
  ej,
  done,
  onToggle,
  onWeight
}) {
  const [tipOpen, setTipOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...exStyles.card,
      ...(done ? exStyles.cardDone : {})
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: exStyles.top
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...exStyles.num,
      ...(done ? exStyles.numDone : {})
    }
  }, done ? '✓' : num), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: exStyles.name
  }, ej.nombre), /*#__PURE__*/React.createElement("div", {
    style: exStyles.det
  }, ej.series, " series \xB7 ", ej.reps))), /*#__PURE__*/React.createElement("div", {
    style: exStyles.btnRow
  }, /*#__PURE__*/React.createElement("button", {
    style: exStyles.btip,
    onClick: () => setTipOpen(o => !o)
  }, "\uD83D\uDCA1 Tip"), ej.video && /*#__PURE__*/React.createElement("a", {
    href: ej.video,
    target: "_blank",
    rel: "noreferrer",
    style: exStyles.bvid
  }, "\u25B6 Video"), onWeight && /*#__PURE__*/React.createElement("div", {
    style: exStyles.pesoRow
  }, /*#__PURE__*/React.createElement("span", {
    style: exStyles.pesoLbl
  }, "kg"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    style: exStyles.pesoIn,
    placeholder: "\u2014",
    onChange: e => onWeight(ej.nombre, e.target.value)
  }))), tipOpen && ej.tip && /*#__PURE__*/React.createElement("div", {
    style: exStyles.tipTxt
  }, ej.tip), /*#__PURE__*/React.createElement("button", {
    style: {
      ...exStyles.bchk,
      ...(done ? exStyles.bchkDone : {})
    },
    onClick: onToggle
  }, done ? '✓ Hecho' : 'Marcar como hecho'));
}
const exStyles = {
  card: {
    background: 'var(--s)',
    border: '1px solid var(--b)',
    borderRadius: 'var(--r)',
    padding: '0.8rem 1rem',
    marginBottom: '0.5rem',
    transition: 'all .25s var(--ease)'
  },
  cardDone: {
    background: 'var(--vl)',
    borderColor: 'var(--vm)'
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  num: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'var(--s2)',
    border: '1px solid var(--bm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--tm)',
    flexShrink: 0,
    transition: 'all .2s var(--ease)'
  },
  numDone: {
    background: 'var(--v)',
    color: 'white',
    borderColor: 'var(--v)'
  },
  name: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--t)'
  },
  det: {
    fontSize: 11,
    color: 'var(--tm)',
    marginTop: 3
  },
  btnRow: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1px solid var(--b)',
    flexWrap: 'wrap'
  },
  btip: {
    background: 'var(--p)',
    borderRadius: 'var(--rs)',
    padding: '5px 11px',
    fontSize: 11,
    color: 'var(--pd)',
    fontWeight: 500
  },
  bvid: {
    background: 'var(--rl)',
    borderRadius: 'var(--rs)',
    padding: '5px 11px',
    fontSize: 11,
    color: 'var(--rd)',
    fontWeight: 500,
    textDecoration: 'none'
  },
  pesoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginLeft: 'auto'
  },
  pesoLbl: {
    fontSize: 11,
    color: 'var(--tm)'
  },
  pesoIn: {
    width: 50,
    padding: '4px 8px',
    border: '1px solid var(--bm)',
    borderRadius: 'var(--rs)',
    fontSize: 12,
    background: 'var(--s2)',
    textAlign: 'center'
  },
  tipTxt: {
    fontSize: 12,
    color: 'var(--vd)',
    background: 'var(--vl)',
    borderRadius: 'var(--rs)',
    padding: '8px 10px',
    marginTop: 8,
    lineHeight: 1.55
  },
  bchk: {
    width: '100%',
    marginTop: 8,
    background: 'var(--s2)',
    border: '1px solid var(--bm)',
    borderRadius: 'var(--rs)',
    padding: '9px 11px',
    fontSize: 12,
    color: 'var(--tm)',
    fontWeight: 500,
    textAlign: 'center'
  },
  bchkDone: {
    background: 'var(--vl)',
    color: 'var(--vd)',
    borderColor: 'var(--vm)'
  }
};

// ─── Timer (fixed above bottom nav) ────────────────────────────────────────
function Timer({
  show,
  seconds = 45,
  onSkip
}) {
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: timerStyles.bar
  }, /*#__PURE__*/React.createElement("div", {
    style: timerStyles.circle
  }, /*#__PURE__*/React.createElement("span", {
    style: timerStyles.num
  }, seconds)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: timerStyles.title
  }, "Descansando\u2026"), /*#__PURE__*/React.createElement("div", {
    style: timerStyles.sub
  }, "Toc\xE1 el c\xEDrculo para cambiar el tiempo")), /*#__PURE__*/React.createElement("button", {
    style: timerStyles.skip,
    onClick: onSkip
  }, "Saltar"));
}
const timerStyles = {
  bar: {
    position: 'fixed',
    bottom: 56,
    left: 0,
    right: 0,
    maxWidth: 430,
    margin: '0 auto',
    background: 'var(--s)',
    borderTop: '1px solid var(--b)',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    zIndex: 30,
    boxShadow: '0 -4px 20px rgba(0,0,0,.08)'
  },
  circle: {
    width: 54,
    height: 54,
    borderRadius: '50%',
    background: 'var(--v)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  num: {
    fontFamily: "'DM Serif Display',serif",
    fontSize: 22,
    color: 'white'
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--t)'
  },
  sub: {
    fontSize: 11,
    color: 'var(--tm)',
    marginTop: 2
  },
  skip: {
    background: 'none',
    border: '1px solid var(--bm)',
    borderRadius: 'var(--rs)',
    padding: '6px 14px',
    fontSize: 12,
    color: 'var(--tm)'
  }
};

// ─── CelebrationModal ──────────────────────────────────────────────────────
function CelebrationModal({
  show,
  dayLabel = 'Día 2',
  onClose
}) {
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: celStyles.overlay,
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: celStyles.card,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("span", {
    style: celStyles.emoji
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("h2", {
    style: celStyles.title
  }, "\xA1", dayLabel, " completo!"), /*#__PURE__*/React.createElement("div", {
    style: celStyles.badge
  }, "Una sesi\xF3n m\xE1s"), /*#__PURE__*/React.createElement("p", {
    style: celStyles.msg
  }, "Cada vez que entren\xE1s, te alej\xE1s del \"alg\xFAn d\xEDa\" y te acerc\xE1s al \"ya estoy\"."), /*#__PURE__*/React.createElement("button", {
    style: celStyles.btn,
    onClick: onClose
  }, "Cerrar")));
}
const celStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.6)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    animation: 'fadeIn .25s ease'
  },
  card: {
    background: 'var(--s)',
    borderRadius: 24,
    padding: '2.25rem 1.75rem 1.75rem',
    textAlign: 'center',
    maxWidth: 320,
    width: '100%',
    animation: 'celPop .45s cubic-bezier(.34,1.56,.64,1)'
  },
  emoji: {
    fontSize: '3.5rem',
    display: 'block',
    marginBottom: '0.6rem'
  },
  title: {
    fontFamily: "'DM Serif Display',serif",
    fontSize: '1.6rem',
    color: 'var(--t)',
    marginBottom: '0.5rem'
  },
  badge: {
    display: 'inline-block',
    background: 'var(--vl)',
    color: 'var(--vd)',
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 'var(--rp)',
    padding: '5px 14px',
    marginBottom: '1.25rem'
  },
  msg: {
    fontSize: 13,
    color: 'var(--tm)',
    marginBottom: '1.25rem',
    lineHeight: 1.6
  },
  btn: {
    width: '100%',
    background: 'var(--v)',
    color: 'white',
    borderRadius: 'var(--rp)',
    padding: 13,
    fontSize: 14,
    fontWeight: 500
  }
};
Object.assign(window, {
  ExerciseCard,
  Timer,
  CelebrationModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alumna/Exercise.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alumna/Header.jsx
try { (() => {
/* global React */

// ─── Header ────────────────────────────────────────────────────────────────
function Header({
  name = 'María',
  dayLabel = 'Día 2',
  subtitle = 'Semana 2 · Ciclo 3',
  theme,
  onToggleTheme
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: headerStyles.bar
  }, /*#__PURE__*/React.createElement("div", {
    style: headerStyles.logo
  }, "A"), /*#__PURE__*/React.createElement("div", {
    style: headerStyles.txt
  }, /*#__PURE__*/React.createElement("h1", {
    style: headerStyles.title
  }, name, " \xB7 ", dayLabel), /*#__PURE__*/React.createElement("p", {
    style: headerStyles.sub
  }, subtitle)), /*#__PURE__*/React.createElement("button", {
    style: headerStyles.btn,
    onClick: onToggleTheme,
    "aria-label": "Cambiar tema"
  }, theme === 'dark' ? '☀️' : '🌙'));
}
const headerStyles = {
  bar: {
    background: 'var(--s)',
    borderBottom: '1px solid var(--b)',
    padding: '0.9rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    position: 'sticky',
    top: 0,
    zIndex: 20
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: 'var(--vl)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Serif Display',serif",
    fontSize: 14,
    color: 'var(--vd)',
    flexShrink: 0
  },
  txt: {
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--t)'
  },
  sub: {
    fontSize: 11,
    color: 'var(--tm)'
  },
  btn: {
    background: 'none',
    border: '1px solid var(--bm)',
    borderRadius: 20,
    padding: '4px 10px',
    fontSize: 13,
    color: 'var(--tm)'
  }
};

// ─── BottomNav ─────────────────────────────────────────────────────────────
function BottomNav({
  active,
  onChange
}) {
  const items = [{
    id: 'rutina',
    emoji: '🏋️',
    label: 'Rutina'
  }, {
    id: 'progreso',
    emoji: '📈',
    label: 'Progreso'
  }, {
    id: 'notas',
    emoji: '💬',
    label: 'Notas'
  }, {
    id: 'perfil',
    emoji: '👤',
    label: 'Perfil'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: bnavStyles.wrap
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    onClick: () => onChange(it.id),
    style: bnavStyles.item
  }, /*#__PURE__*/React.createElement("span", {
    style: bnavStyles.emoji
  }, it.emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bnavStyles.label,
      color: active === it.id ? 'var(--v)' : 'var(--tm)',
      fontWeight: active === it.id ? 500 : 400
    }
  }, it.label))));
}
const bnavStyles = {
  wrap: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: 430,
    margin: '0 auto',
    background: 'var(--s)',
    borderTop: '1px solid var(--b)',
    display: 'flex',
    zIndex: 25
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    padding: '10px 4px'
  },
  emoji: {
    fontSize: 18
  },
  label: {
    fontSize: 10
  }
};
Object.assign(window, {
  Header,
  BottomNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alumna/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alumna/HomeBits.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ─── WarmupCard ────────────────────────────────────────────────────────────
function WarmupCard({
  minutes = 5,
  href = '#'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: warmupStyles.card
  }, /*#__PURE__*/React.createElement("div", {
    style: warmupStyles.title
  }, "ENTRADA EN CALOR \xB7 ", minutes, " MIN"), /*#__PURE__*/React.createElement("a", {
    href: href,
    style: warmupStyles.link
  }, /*#__PURE__*/React.createElement("span", {
    style: warmupStyles.play
  }, /*#__PURE__*/React.createElement("span", {
    style: warmupStyles.tri
  })), "Ver entrada en calor"));
}
const warmupStyles = {
  card: {
    background: 'var(--a)',
    borderRadius: 'var(--rs)',
    padding: '0.75rem 1rem',
    marginBottom: '0.85rem'
  },
  title: {
    fontSize: 10,
    fontWeight: 500,
    color: 'var(--ad)',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  link: {
    fontSize: 12,
    color: 'var(--ad)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    fontWeight: 500
  },
  play: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: 'var(--ad)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  tri: {
    borderLeft: '5px solid var(--a)',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    marginLeft: 2
  }
};

// ─── WeekChips & DayTabs ───────────────────────────────────────────────────
function WeekChips({
  weeks,
  value,
  onChange,
  label = 'SEMANA'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '0.65rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: selStyles.label
  }, label), /*#__PURE__*/React.createElement("div", {
    style: selStyles.row
  }, weeks.map(w => /*#__PURE__*/React.createElement("button", {
    key: w,
    onClick: () => onChange(w),
    style: {
      ...selStyles.chip,
      ...(value === w ? selStyles.chipActive : {})
    }
  }, "Semana ", w))));
}
function DayTabs({
  days,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: selStyles.dtabs
  }, days.map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => onChange(d),
    style: {
      ...selStyles.dtab,
      ...(value === d ? selStyles.dtabActive : {})
    }
  }, "D\xEDa ", d)));
}
const selStyles = {
  label: {
    fontSize: 10,
    fontWeight: 500,
    color: 'var(--th)',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 4
  },
  row: {
    display: 'flex',
    gap: 5,
    flexWrap: 'wrap'
  },
  chip: {
    padding: '5px 13px',
    borderRadius: 'var(--rp)',
    fontSize: 11,
    border: '1px solid var(--bm)',
    background: 'var(--s)',
    color: 'var(--tm)'
  },
  chipActive: {
    background: 'var(--p)',
    color: 'var(--pd)',
    borderColor: 'transparent',
    fontWeight: 500
  },
  dtabs: {
    display: 'flex',
    gap: 6,
    marginBottom: '0.85rem'
  },
  dtab: {
    flex: 1,
    padding: '9px 4px',
    borderRadius: 'var(--rp)',
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid var(--bm)',
    background: 'var(--s)',
    color: 'var(--tm)'
  },
  dtabActive: {
    background: 'var(--v)',
    color: 'white',
    borderColor: 'var(--v)'
  }
};

// ─── ProgressBar ───────────────────────────────────────────────────────────
function ProgressBar({
  done,
  total
}) {
  const pct = Math.round(done / total * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: progStyles.top
  }, /*#__PURE__*/React.createElement("span", null, done, " de ", total, " ejercicios"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--vd)',
      fontWeight: 500
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: progStyles.bar
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...progStyles.fill,
      width: `${pct}%`
    }
  })));
}
const progStyles = {
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    color: 'var(--tm)',
    marginBottom: 5
  },
  bar: {
    height: 6,
    background: 'var(--b)',
    borderRadius: 99,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    background: 'var(--v)',
    borderRadius: 99,
    transition: 'width .4s var(--ease)'
  }
};
Object.assign(window, {
  WarmupCard,
  WeekChips,
  DayTabs,
  ProgressBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alumna/HomeBits.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alumna/Screens.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ─── ProgressScreen ────────────────────────────────────────────────────────
function ProgressScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '1.4rem',
      marginBottom: '0.85rem'
    }
  }, "Tu progreso"), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.stats
  }, /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.stat
  }, /*#__PURE__*/React.createElement("span", {
    style: progScreenStyles.num
  }, "12"), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.lbl
  }, "D\xEDas completados")), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.stat
  }, /*#__PURE__*/React.createElement("span", {
    style: progScreenStyles.num
  }, "8"), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.lbl
  }, "Semanas activa")), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.stat
  }, /*#__PURE__*/React.createElement("span", {
    style: progScreenStyles.num
  }, "3"), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.lbl
  }, "Ciclos hechos")), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.stat
  }, /*#__PURE__*/React.createElement("span", {
    style: progScreenStyles.num
  }, "92%"), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.lbl
  }, "Esta semana"))), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.ctit
  }, "Evoluci\xF3n de pesos \xB7 Sentadilla com\xFAn"), /*#__PURE__*/React.createElement(ChartPlaceholder, null)), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.ctit
  }, "Logros desbloqueados"), /*#__PURE__*/React.createElement("div", {
    style: progScreenStyles.badges
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...progScreenStyles.badge,
      ...progScreenStyles.badgeEarned
    }
  }, "\uD83C\uDFC1 Primer ciclo"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...progScreenStyles.badge,
      ...progScreenStyles.badgeEarned
    }
  }, "\uD83D\uDD25 5 d\xEDas seguidos"), /*#__PURE__*/React.createElement("span", {
    style: progScreenStyles.badge
  }, "\uD83D\uDCAA 10 ciclos"), /*#__PURE__*/React.createElement("span", {
    style: progScreenStyles.badge
  }, "\u2B50 100 ejercicios"))));
}
function ChartPlaceholder() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 160",
    style: {
      width: '100%',
      height: 160,
      display: 'block'
    },
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "120",
    x2: "320",
    y2: "120",
    stroke: "rgba(0,0,0,0.08)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "80",
    x2: "320",
    y2: "80",
    stroke: "rgba(0,0,0,0.05)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "40",
    x2: "320",
    y2: "40",
    stroke: "rgba(0,0,0,0.05)"
  }), /*#__PURE__*/React.createElement("polyline", {
    fill: "none",
    stroke: "#1D9E75",
    strokeWidth: "2.5",
    points: "20,120 80,100 140,90 200,70 260,50 300,40"
  }), [[20, 120], [80, 100], [140, 90], [200, 70], [260, 50], [300, 40]].map(([x, y], i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x,
    cy: y,
    r: "4",
    fill: "#fff",
    stroke: "#1D9E75",
    strokeWidth: "2"
  })));
}
const progScreenStyles = {
  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    marginBottom: '1rem'
  },
  stat: {
    background: 'var(--s)',
    border: '1px solid var(--b)',
    borderRadius: 'var(--rs)',
    padding: '0.85rem 1rem'
  },
  num: {
    fontFamily: "'DM Serif Display',serif",
    fontSize: '1.75rem',
    color: 'var(--v)',
    display: 'block'
  },
  lbl: {
    fontSize: 11,
    color: 'var(--tm)',
    marginTop: 2
  },
  section: {
    background: 'var(--s)',
    border: '1px solid var(--b)',
    borderRadius: 'var(--r)',
    padding: '1rem',
    marginBottom: '1rem'
  },
  ctit: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--t)',
    marginBottom: 8
  },
  badges: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap'
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: 'var(--s2)',
    borderRadius: 'var(--rs)',
    padding: '6px 10px',
    fontSize: 11,
    color: 'var(--tm)'
  },
  badgeEarned: {
    background: 'var(--vl)',
    color: 'var(--vd)'
  }
};

// ─── NotesScreen ───────────────────────────────────────────────────────────
function NotesScreen() {
  const [notes, setNotes] = useState([{
    from: 'amira',
    date: 'Mar 10',
    text: '¡Buen ritmo esta semana! Subí un poquito en sentadilla si te animás.'
  }, {
    from: 'alumna',
    date: 'Mar 12',
    text: 'Me costó el hollow hold, ¿hay alguna variante más simple?'
  }, {
    from: 'amira',
    date: 'Mar 13',
    text: 'Sí, hacelo con rodillas flexionadas en vez de piernas estiradas. Cuando lo hagas fluido, vamos a la versión completa 💪'
  }]);
  const [draft, setDraft] = useState('');
  function send() {
    if (!draft.trim()) return;
    setNotes(n => [...n, {
      from: 'alumna',
      date: 'Hoy',
      text: draft.trim()
    }]);
    setDraft('');
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '1.4rem',
      marginBottom: '0.85rem'
    }
  }, "Notas con Amira"), /*#__PURE__*/React.createElement("div", {
    style: notesStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: notesStyles.hint
  }, "Dej\xE1 cualquier duda o comentario sobre la rutina. Amira lo lee y te responde."), notes.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: notesStyles.item
  }, /*#__PURE__*/React.createElement("div", {
    style: notesStyles.meta
  }, n.from === 'amira' ? '👩 Amira' : 'Vos', " \xB7 ", n.date), /*#__PURE__*/React.createElement("div", null, n.text)))), /*#__PURE__*/React.createElement("div", {
    style: notesStyles.composer
  }, /*#__PURE__*/React.createElement("textarea", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    placeholder: "Escribir un comentario\u2026",
    style: notesStyles.input
  }), /*#__PURE__*/React.createElement("button", {
    style: notesStyles.send,
    onClick: send
  }, "Enviar")));
}
const notesStyles = {
  section: {
    background: 'var(--s)',
    border: '1px solid var(--b)',
    borderRadius: 'var(--r)',
    padding: '1rem',
    marginBottom: '1rem'
  },
  hint: {
    fontSize: 11,
    color: 'var(--tm)',
    marginBottom: 10,
    lineHeight: 1.5
  },
  item: {
    background: 'var(--s2)',
    borderRadius: 'var(--rs)',
    padding: '8px 10px',
    marginBottom: 6,
    fontSize: 12,
    color: 'var(--t)',
    lineHeight: 1.5
  },
  meta: {
    fontSize: 10,
    color: 'var(--th)',
    marginBottom: 3
  },
  composer: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    padding: '8px 10px',
    border: '1px solid var(--bm)',
    borderRadius: 'var(--rs)',
    fontSize: 12,
    background: 'var(--s2)',
    minHeight: 40,
    resize: 'none'
  },
  send: {
    background: 'var(--v)',
    color: 'white',
    borderRadius: 'var(--rs)',
    padding: '8px 14px',
    fontSize: 12,
    fontWeight: 500
  }
};
Object.assign(window, {
  ProgressScreen,
  NotesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alumna/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/HeroNav.jsx
try { (() => {
/* global React */

const WA_URL = 'https://wa.me/5492226500790?text=Hola%20Amira!%20Quiero%20saber%20m%C3%A1s';

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  return /*#__PURE__*/React.createElement("nav", {
    style: navStyles.bar
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: navStyles.brand
  }, /*#__PURE__*/React.createElement("div", {
    style: navStyles.logo
  }, "A"), "Amira Fitness"), /*#__PURE__*/React.createElement("div", {
    style: navStyles.links
  }, /*#__PURE__*/React.createElement("a", {
    href: "#como-funciona",
    style: navStyles.link
  }, "C\xF3mo funciona"), /*#__PURE__*/React.createElement("a", {
    href: "#que-incluye",
    style: navStyles.link
  }, "El servicio"), /*#__PURE__*/React.createElement("a", {
    href: "#la-app",
    style: navStyles.link
  }, "La app"), /*#__PURE__*/React.createElement("a", {
    href: WA_URL,
    target: "_blank",
    rel: "noreferrer",
    style: navStyles.link
  }, "WhatsApp"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: navStyles.cta
  }, "Quiero empezar")));
}
const navStyles = {
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'rgba(255,255,255,0.93)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderBottom: '1px solid var(--b)',
    padding: '0.9rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 500,
    fontSize: 15,
    color: 'var(--t)'
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: 'var(--vl)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Serif Display',serif",
    fontSize: 14,
    color: 'var(--vd)'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  link: {
    fontSize: 13,
    color: 'var(--tm)'
  },
  cta: {
    background: 'var(--v)',
    color: 'white',
    padding: '8px 18px',
    borderRadius: 'var(--rp)',
    fontSize: 13,
    fontWeight: 500
  }
};

// ─── WhatsApp icon ─────────────────────────────────────────────────────────
function WAIcon({
  size = 18
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 0C5.373 0 0 5.373 0 12c0 2.138.564 4.14 1.544 5.875L0 24l6.336-1.52A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.366l-.36-.214-3.732.896.942-3.623-.235-.373A9.815 9.815 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"
  }));
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: heroStyles.wrap
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: heroStyles.badge
  }, "Entrenadora personal \xB7 Buenos Aires"), /*#__PURE__*/React.createElement("h1", {
    className: "serif",
    style: heroStyles.quote
  }, "No quiero darte ", /*#__PURE__*/React.createElement("em", {
    style: heroStyles.em
  }, "otra rutina de internet"), ".", /*#__PURE__*/React.createElement("br", null), "Quiero conocerte y armarte la tuya."), /*#__PURE__*/React.createElement("p", {
    style: heroStyles.desc
  }, "Soy Amira. Trabajo con pocas alumnas a la vez para poder responderte yo, no un bot. Te armo tu rutina, te la ajusto cada semana, y te contesto las dudas por WhatsApp el mismo d\xEDa."), /*#__PURE__*/React.createElement("a", {
    href: WA_URL,
    target: "_blank",
    rel: "noreferrer",
    style: heroStyles.cta
  }, /*#__PURE__*/React.createElement(WAIcon, null), " Escribime y charlamos"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: heroStyles.alt
  }, "o complet\xE1 el formulario \xB7 2 min \u2192"), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.trust
  }, /*#__PURE__*/React.createElement("span", {
    style: heroStyles.trustItem
  }, /*#__PURE__*/React.createElement("span", {
    style: heroStyles.dot
  }), "Cupos limitados"), /*#__PURE__*/React.createElement("span", {
    style: heroStyles.trustItem
  }, /*#__PURE__*/React.createElement("span", {
    style: heroStyles.dot
  }), "Sin contrato"), /*#__PURE__*/React.createElement("span", {
    style: heroStyles.trustItem
  }, /*#__PURE__*/React.createElement("span", {
    style: heroStyles.dot
  }), "Respuesta en el d\xEDa"))), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.photo
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/foto-amira.jpg",
    alt: "Amira",
    style: heroStyles.photoImg
  })));
}
const heroStyles = {
  wrap: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '5.5rem 2rem 5rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'center'
  },
  badge: {
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--v)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
    display: 'block'
  },
  quote: {
    fontSize: '2.6rem',
    lineHeight: 1.15,
    color: 'var(--t)',
    marginBottom: '1.5rem'
  },
  em: {
    fontStyle: 'italic',
    color: 'var(--v)'
  },
  desc: {
    fontSize: '0.975rem',
    color: 'var(--tm)',
    marginBottom: '2rem',
    maxWidth: 440,
    lineHeight: 1.85
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: '#25D366',
    color: 'white',
    padding: '15px 26px',
    borderRadius: 'var(--rp)',
    fontSize: 15,
    fontWeight: 500,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 380
  },
  alt: {
    display: 'block',
    marginTop: '0.5rem',
    fontSize: 13,
    color: 'var(--tm)',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    textAlign: 'center',
    maxWidth: 380
  },
  trust: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    marginTop: '2rem'
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 12,
    color: 'var(--tm)'
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--v)'
  },
  photo: {
    borderRadius: 24,
    aspectRatio: '4/5',
    overflow: 'hidden',
    background: 'var(--s2)',
    border: '1px solid var(--b)'
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 70%',
    display: 'block'
  }
};
Object.assign(window, {
  Nav,
  Hero,
  WAIcon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/HeroNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingApp.jsx
try { (() => {
/* global React, Nav, Hero, Filosofia, Steps, Services, AppPreview, CTAFinal, Footer */

function MarketingApp() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Filosofia, null), /*#__PURE__*/React.createElement(Steps, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(AppPreview, null), /*#__PURE__*/React.createElement(CTAFinal, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(MarketingApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Sections.jsx
try { (() => {
/* global React, WAIcon */

const WA_URL = 'https://wa.me/5492226500790?text=Hola%20Amira!%20Quiero%20saber%20m%C3%A1s';

// ─── Filosofia (dark green) ────────────────────────────────────────────────
function Filosofia() {
  return /*#__PURE__*/React.createElement("section", {
    style: fiStyles.bg
  }, /*#__PURE__*/React.createElement("div", {
    style: fiStyles.container
  }, /*#__PURE__*/React.createElement("div", {
    style: fiStyles.inner
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: fiStyles.stag
  }, "Sobre Amira"), /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: fiStyles.title
  }, "Cada cuerpo tiene su historia. Yo quiero escuchar la tuya."), /*#__PURE__*/React.createElement("p", {
    style: fiStyles.p
  }, "Soy entrenadora personal y lo que m\xE1s me importa es entender tu punto de partida: no el de otra persona, no el de un programa gen\xE9rico. El tuyo."), /*#__PURE__*/React.createElement("p", {
    style: fiStyles.p
  }, "Trabajo a distancia con alumnas de diferentes niveles, rutinas y cuerpos. Cada una tiene su plan, su seguimiento y su contacto directo conmigo."), /*#__PURE__*/React.createElement("div", {
    style: fiStyles.pillars
  }, /*#__PURE__*/React.createElement("div", {
    style: fiStyles.pillar
  }, /*#__PURE__*/React.createElement("div", {
    style: fiStyles.picon
  }, "\uD83C\uDFAF"), "Objetivos reales, no ideales de revista"), /*#__PURE__*/React.createElement("div", {
    style: fiStyles.pillar
  }, /*#__PURE__*/React.createElement("div", {
    style: fiStyles.picon
  }, "\uD83D\uDD04"), "Rutinas que evolucionan con vos"), /*#__PURE__*/React.createElement("div", {
    style: fiStyles.pillar
  }, /*#__PURE__*/React.createElement("div", {
    style: fiStyles.picon
  }, "\uD83D\uDCAC"), "Contacto directo \u2014 siempre con Amira"))), /*#__PURE__*/React.createElement("div", {
    style: fiStyles.callout
  }, /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: fiStyles.big
  }, "\""), /*#__PURE__*/React.createElement("p", {
    style: fiStyles.coP
  }, "No soy un bot, no soy un PDF y no soy un gimnasio. Soy una persona que va a conocer tu caso, armar tu plan y estar presente semana a semana para que funcione."), /*#__PURE__*/React.createElement("p", {
    style: fiStyles.attrib
  }, "\u2014 Amira Lezcano")))));
}
const fiStyles = {
  bg: {
    background: 'var(--vd)',
    padding: '5rem 2rem'
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto'
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'center'
  },
  stag: {
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--vm)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem'
  },
  title: {
    fontSize: '2rem',
    color: 'white',
    marginBottom: '1rem',
    lineHeight: 1.2
  },
  p: {
    color: 'rgba(255,255,255,.78)',
    fontSize: '0.975rem',
    lineHeight: 1.85,
    marginBottom: '1.2rem'
  },
  pillars: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1.5rem'
  },
  pillar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    color: 'rgba(255,255,255,.85)',
    fontSize: 14
  },
  picon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'rgba(255,255,255,.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: 16
  },
  callout: {
    background: 'rgba(255,255,255,.08)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: 'var(--r)',
    padding: '1.75rem',
    color: 'white'
  },
  big: {
    fontSize: '2.8rem',
    lineHeight: 1,
    fontStyle: 'italic',
    marginBottom: '0.75rem'
  },
  coP: {
    fontSize: 13,
    color: 'rgba(255,255,255,.65)',
    lineHeight: 1.7
  },
  attrib: {
    marginTop: '1rem',
    fontSize: 12.5,
    color: 'rgba(255,255,255,.45)'
  }
};

// ─── Steps ─────────────────────────────────────────────────────────────────
function Steps() {
  const steps = [{
    n: 1,
    t: 'Me escribís por WhatsApp',
    d: 'Me contás qué querés lograr, cuántos días tenés para entrenar y si hay algo que tenga que saber.'
  }, {
    n: 2,
    t: 'Te conozco y acordamos',
    d: 'En menos de 24hs te respondo, charlamos lo necesario y acordamos el plan.'
  }, {
    n: 3,
    t: 'Recibís tu rutina',
    d: 'Te llega tu link personal con tu rutina completa: ejercicios, series, videos y notas.'
  }, {
    n: 4,
    t: 'Entrenás y evolucionás',
    d: 'Registrás tu progreso en la app y yo ajusto tu rutina semana a semana.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '5rem 2rem'
    },
    id: "como-funciona"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--v)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '0.75rem'
    }
  }, "El proceso"), /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '2.3rem',
      marginBottom: '1rem',
      color: 'var(--t)',
      lineHeight: 1.2
    }
  }, "C\xF3mo funciona"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.975rem',
      color: 'var(--tm)',
      maxWidth: 520,
      lineHeight: 1.8
    }
  }, "Desde que me escrib\xEDs hasta que empez\xE1s a entrenar, todo est\xE1 pensado para que sea simple y sin vueltas."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.5rem',
      marginTop: '3rem'
    }
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--v)',
      color: 'white',
      fontSize: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem'
    }
  }, s.n), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      marginBottom: '0.5rem',
      color: 'var(--t)'
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--tm)',
      lineHeight: 1.7
    }
  }, s.d))))));
}

// ─── Services ──────────────────────────────────────────────────────────────
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '5rem 2rem',
      background: 'var(--bg)'
    },
    id: "que-incluye"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--v)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '0.75rem'
    }
  }, "El servicio"), /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '2.3rem',
      marginBottom: '1rem',
      color: 'var(--t)',
      lineHeight: 1.2
    }
  }, "\xBFQu\xE9 incluye?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.975rem',
      color: 'var(--tm)',
      maxWidth: 520,
      lineHeight: 1.8
    }
  }, "Cada alumna tiene un plan \xFAnico. No hay rutinas gen\xE9ricas ni programas enlatados."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      marginTop: '3rem'
    }
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    icon: "\uD83D\uDCCB",
    iconBg: "var(--vl)",
    title: "Rutina 100% personalizada",
    desc: "Armada espec\xEDficamente para vos: tus objetivos, tu nivel, tu equipamiento y tu disponibilidad. Cambia y crece con vos cada semana.",
    tag: "A distancia"
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    icon: "\uD83D\uDCCA",
    iconBg: "var(--a)",
    title: "Seguimiento semanal real",
    desc: "Reviso tu progreso, tus pesos y tus comentarios semana a semana. La rutina se ajusta seg\xFAn c\xF3mo evolucion\xE1s.",
    tag: "Incluido siempre"
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    icon: "\uD83D\uDCAC",
    iconBg: "var(--p)",
    title: "Contacto directo conmigo",
    desc: "Pod\xE9s escribirme desde la app, dejar notas en cada ejercicio y hacer preguntas. Atenci\xF3n personalizada \u2014 no respuestas autom\xE1ticas.",
    tag: "WhatsApp + app"
  }))));
}
function ServiceCard({
  icon,
  iconBg,
  title,
  desc,
  tag
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 'var(--r)',
      padding: '1.75rem',
      transition: 'box-shadow .2s var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 12,
      background: iconBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      marginBottom: '1.25rem'
    }
  }, icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      marginBottom: '0.5rem',
      color: 'var(--t)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--tm)',
      lineHeight: 1.75
    }
  }, desc), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: '1.25rem',
      display: 'inline-block',
      fontSize: 11.5,
      fontWeight: 500,
      color: 'var(--vd)',
      background: 'var(--vl)',
      padding: '3px 10px',
      borderRadius: 'var(--rp)'
    }
  }, tag));
}

// ─── AppPreview (dark section) ─────────────────────────────────────────────
function AppPreview() {
  const feats = ['Videos de referencia por ejercicio', 'Registro de pesos y progreso', 'Temporizador de descanso', 'Notas de técnica por ejercicio', 'Modo oscuro para el gimnasio', 'Recordatorios de entrenamiento'];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '5rem 2rem',
      background: 'var(--t)',
      color: 'white'
    },
    id: "la-app"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--vm)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '0.75rem'
    }
  }, "La app"), /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '2.3rem',
      marginBottom: '1rem',
      color: 'white',
      lineHeight: 1.2
    }
  }, "Tu entrenamiento, siempre en el celu"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.975rem',
      color: 'rgba(255,255,255,.65)',
      maxWidth: 520,
      lineHeight: 1.8
    }
  }, "Cada alumna recibe un link personal con su rutina completa. Sin descargas, sin registros complicados. Se instala como app en tu tel\xE9fono."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.85rem',
      marginTop: '2rem'
    }
  }, feats.map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      minWidth: 20,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      color: 'var(--vm)',
      marginTop: 1
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,.8)',
      lineHeight: 1.5
    }
  }, f))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,.05)',
      border: '1px solid rgba(255,255,255,.12)',
      borderRadius: 28,
      padding: '2.5rem 2rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '4.5rem',
      display: 'block',
      marginBottom: '1rem'
    }
  }, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'rgba(255,255,255,.85)',
      display: 'block',
      fontSize: 15,
      fontWeight: 500,
      marginBottom: '0.35rem'
    }
  }, "Tu rutina personalizada"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,.5)'
    }
  }, "Siempre disponible, funciona sin internet"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '1.5rem',
      fontSize: 11,
      color: 'rgba(255,255,255,.3)'
    }
  }, "Instalable como app en iOS y Android"))));
}

// ─── CTAFinal ──────────────────────────────────────────────────────────────
function CTAFinal() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'linear-gradient(135deg, var(--vd) 0%, var(--v) 100%)',
      textAlign: 'center',
      color: 'white',
      padding: '6rem 2rem'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: {
      fontSize: '2.6rem',
      color: 'white',
      marginBottom: '1rem',
      lineHeight: 1.15
    }
  }, "Si llegaste hasta ac\xE1, charlemos."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '1rem',
      color: 'rgba(255,255,255,.75)',
      maxWidth: 480,
      margin: '0 auto 2rem',
      lineHeight: 1.8
    }
  }, "Sin compromiso, sin formulario largo.", /*#__PURE__*/React.createElement("br", null), "Me escrib\xEDs, te respondo yo."), /*#__PURE__*/React.createElement("a", {
    href: WA_URL,
    target: "_blank",
    rel: "noreferrer",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'white',
      color: 'var(--vd)',
      padding: '13px 26px',
      borderRadius: 'var(--rp)',
      fontSize: 14,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(WAIcon, {
    size: 17
  }), " Escribime y charlamos"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'block',
      marginTop: '1rem',
      fontSize: 13,
      color: 'rgba(255,255,255,.55)',
      textDecoration: 'underline',
      textUnderlineOffset: '3px'
    }
  }, "o complet\xE1 el formulario \xB7 2 min \u2192"));
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: '#111',
      color: 'rgba(255,255,255,.35)',
      padding: '2rem',
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 1.9
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'rgba(255,255,255,.8)'
    }
  }, "Amira Fitness"), " \xB7 Entrenamiento personalizado \xB7 Buenos Aires, Argentina", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'rgba(255,255,255,.35)'
    }
  }, "Panel"), " \xB7 \xA9 2025");
}
Object.assign(window, {
  Filosofia,
  Steps,
  Services,
  AppPreview,
  CTAFinal,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/panel/Dashboard.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ─── Dashboard ─────────────────────────────────────────────────────────────
function Dashboard() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: '1.6rem',
      marginBottom: '1.25rem'
    }
  }, "Inicio"), /*#__PURE__*/React.createElement("div", {
    style: dbStyles.metrics
  }, /*#__PURE__*/React.createElement(Metric, {
    label: "Alumnas activas",
    value: "12",
    green: true
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Pendientes",
    value: "3"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Esta semana",
    value: "84%",
    green: true
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Comentarios sin leer",
    value: "5"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Pr\xF3ximos recordatorios"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--tm)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement(Row, {
    left: "Lunes 9:00 \u2014 Recordatorio de entrenamiento",
    right: "12 alumnas"
  }), /*#__PURE__*/React.createElement(Row, {
    left: "Mi\xE9rcoles 9:00 \u2014 Recordatorio de entrenamiento",
    right: "12 alumnas"
  }), /*#__PURE__*/React.createElement(Row, {
    left: "Domingo 10:00 \u2014 Resumen semanal",
    right: "12 alumnas"
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Registros pendientes"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--tm)'
    }
  }, "3 alumnas nuevas esperando aprobaci\xF3n. ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--v)',
      fontWeight: 500
    },
    href: "#"
  }, "Ver registros \u2192"))));
}
function Metric({
  label,
  value,
  green
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: dbStyles.metric
  }, /*#__PURE__*/React.createElement("div", {
    style: dbStyles.mlabel
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: '2rem',
      color: green ? 'var(--vd)' : 'var(--t)',
      lineHeight: 1
    }
  }, value));
}
function Card({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: dbStyles.card
  }, /*#__PURE__*/React.createElement("div", {
    style: dbStyles.ctitle
  }, title), children);
}
function Row({
  left,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.6rem 0',
      borderBottom: '1px solid var(--b)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--t)'
    }
  }, left), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--tm)'
    }
  }, right));
}
const dbStyles = {
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    marginBottom: '1.5rem'
  },
  metric: {
    background: 'var(--s)',
    border: '1px solid var(--b)',
    borderRadius: 'var(--rs)',
    padding: '1rem 1.25rem'
  },
  mlabel: {
    fontSize: 11,
    color: 'var(--tm)',
    marginBottom: 4
  },
  card: {
    background: 'var(--s)',
    border: '1px solid var(--b)',
    borderRadius: 'var(--r)',
    padding: '1.25rem 1.5rem',
    marginBottom: '1rem'
  },
  ctitle: {
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--tm)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem'
  }
};

// ─── AlumnasList ───────────────────────────────────────────────────────────
const ALUMNAS = [{
  id: 1,
  nombre: 'María González',
  tipo: 'Gimnasio · 3 días/sem',
  av: 'teal',
  estado: 'Activa',
  ciclo: 3
}, {
  id: 2,
  nombre: 'Lucía Pérez',
  tipo: 'Casa · 4 días/sem',
  av: 'purple',
  estado: 'Activa',
  ciclo: 2
}, {
  id: 3,
  nombre: 'Sofía Martínez',
  tipo: 'Gimnasio · 5 días/sem',
  av: 'amber',
  estado: 'Activa',
  ciclo: 5
}, {
  id: 4,
  nombre: 'Camila Ruiz',
  tipo: 'Casa · 2 días/sem',
  av: 'coral',
  estado: 'Pausada',
  ciclo: 1
}, {
  id: 5,
  nombre: 'Valentina Sosa',
  tipo: 'Gimnasio · 3 días/sem',
  av: 'teal',
  estado: 'Activa',
  ciclo: 4
}, {
  id: 6,
  nombre: 'Florencia López',
  tipo: 'Casa · 4 días/sem',
  av: 'purple',
  estado: 'Pendiente',
  ciclo: 0
}];
function AlumnasList({
  onOpen
}) {
  const [filter, setFilter] = useState('Todas');
  const filtered = ALUMNAS.filter(a => filter === 'Todas' ? true : a.estado === filter);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: '1.6rem',
      marginBottom: '1rem'
    }
  }, "Alumnas"), /*#__PURE__*/React.createElement("div", {
    style: alStyles.toolbar
  }, /*#__PURE__*/React.createElement("div", {
    style: alStyles.chips
  }, ['Todas', 'Activa', 'Pausada', 'Pendiente'].map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFilter(f),
    style: {
      ...alStyles.chip,
      ...(filter === f ? alStyles.chipOn : {})
    }
  }, f))), /*#__PURE__*/React.createElement("button", {
    style: alStyles.cta
  }, "+ Nueva alumna")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 'var(--r)',
      padding: '0.5rem 1.25rem'
    }
  }, filtered.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    onClick: () => onOpen(a),
    style: alStyles.row
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...alStyles.av,
      ...avBg(a.av)
    }
  }, a.nombre[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: alStyles.name
  }, a.nombre), /*#__PURE__*/React.createElement("div", {
    style: alStyles.sub
  }, a.tipo, " \xB7 Ciclo ", a.ciclo)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...alStyles.badge,
      ...stateBadge(a.estado)
    }
  }, a.estado), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--th)',
      fontSize: 16,
      marginLeft: 8
    }
  }, "\u203A")))));
}
function avBg(c) {
  return {
    teal: {
      background: 'var(--vl)',
      color: 'var(--vd)'
    },
    purple: {
      background: 'var(--p)',
      color: 'var(--pd)'
    },
    amber: {
      background: 'var(--a)',
      color: 'var(--ad)'
    },
    coral: {
      background: 'var(--co)',
      color: 'var(--cod)'
    }
  }[c];
}
function stateBadge(s) {
  if (s === 'Activa') return {
    background: 'var(--vl)',
    color: 'var(--vd)'
  };
  if (s === 'Pausada') return {
    background: 'var(--p)',
    color: 'var(--pd)'
  };
  return {
    background: 'var(--a)',
    color: 'var(--ad)'
  };
}
const alStyles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    gap: 12,
    flexWrap: 'wrap'
  },
  chips: {
    display: 'flex',
    gap: 5,
    flexWrap: 'wrap'
  },
  chip: {
    padding: '5px 13px',
    borderRadius: 'var(--rp)',
    fontSize: 11,
    border: '1px solid var(--bm)',
    background: 'var(--s)',
    color: 'var(--tm)'
  },
  chipOn: {
    background: 'var(--p)',
    color: 'var(--pd)',
    borderColor: 'transparent',
    fontWeight: 500
  },
  cta: {
    background: 'var(--v)',
    color: 'white',
    borderRadius: 'var(--rp)',
    padding: '8px 18px',
    fontSize: 12,
    fontWeight: 500
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '0.75rem 0',
    borderBottom: '1px solid var(--b)',
    width: '100%',
    background: 'none'
  },
  av: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Serif Display',serif",
    fontSize: 16,
    flexShrink: 0
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--t)'
  },
  sub: {
    fontSize: 11,
    color: 'var(--tm)',
    marginTop: 2
  },
  badge: {
    fontSize: 10,
    padding: '2px 9px',
    borderRadius: 'var(--rp)',
    fontWeight: 500
  }
};
Object.assign(window, {
  Dashboard,
  AlumnasList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/panel/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/panel/Drawer.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ─── AlumnaDrawer ──────────────────────────────────────────────────────────
function AlumnaDrawer({
  alumna,
  onClose
}) {
  const [tab, setTab] = useState('rutina');
  if (!alumna) return null;
  const tabs = [{
    id: 'rutina',
    label: 'Rutina'
  }, {
    id: 'datos',
    label: 'Datos'
  }, {
    id: 'historial',
    label: 'Historial'
  }, {
    id: 'notas',
    label: 'Notas'
  }, {
    id: 'link',
    label: 'Link de acceso'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: drStyles.overlay,
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    style: drStyles.drawer
  }, /*#__PURE__*/React.createElement("div", {
    style: drStyles.head
  }, /*#__PURE__*/React.createElement("div", {
    style: drStyles.headTop
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...drStyles.av,
      background: 'var(--vl)',
      color: 'var(--vd)'
    }
  }, alumna.nombre[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: drStyles.name
  }, alumna.nombre), /*#__PURE__*/React.createElement("div", {
    style: drStyles.sub
  }, alumna.tipo, " \xB7 Ciclo ", alumna.ciclo))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: drStyles.close,
    "aria-label": "Cerrar"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: drStyles.tabs
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      ...drStyles.tab,
      ...(tab === t.id ? drStyles.tabOn : {})
    }
  }, t.label)))), /*#__PURE__*/React.createElement("div", {
    style: drStyles.body
  }, tab === 'rutina' && /*#__PURE__*/React.createElement(RoutineBuilder, null), tab === 'datos' && /*#__PURE__*/React.createElement(DatosTab, {
    alumna: alumna
  }), tab === 'historial' && /*#__PURE__*/React.createElement(HistorialTab, null), tab === 'notas' && /*#__PURE__*/React.createElement(NotasTab, null), tab === 'link' && /*#__PURE__*/React.createElement(LinkTab, {
    alumna: alumna
  }))));
}
const drStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.45)',
    zIndex: 100
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 'min(620px, 100vw)',
    height: '100vh',
    background: 'var(--s)',
    zIndex: 101,
    overflowY: 'auto',
    boxShadow: '-4px 0 40px rgba(0,0,0,.2)',
    display: 'flex',
    flexDirection: 'column'
  },
  head: {
    position: 'sticky',
    top: 0,
    background: 'var(--s)',
    zIndex: 10,
    borderBottom: '1px solid var(--b)',
    padding: '1rem 1.25rem 0'
  },
  headTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  av: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Serif Display',serif",
    fontSize: 18
  },
  name: {
    fontSize: '1.3rem'
  },
  sub: {
    fontSize: 12,
    color: 'var(--tm)',
    marginTop: 2
  },
  close: {
    background: 'none',
    fontSize: 18,
    color: 'var(--tm)',
    padding: 4
  },
  tabs: {
    display: 'flex',
    gap: 4,
    overflowX: 'auto'
  },
  tab: {
    padding: '8px 14px',
    fontSize: 12,
    color: 'var(--tm)',
    borderBottom: '2px solid transparent',
    whiteSpace: 'nowrap'
  },
  tabOn: {
    fontWeight: 600,
    color: 'var(--v)',
    borderBottomColor: 'var(--v)'
  },
  body: {
    padding: '1.25rem',
    flex: 1
  }
};

// ─── DatosTab ───────────────────────────────────────────────────────────────
function DatosTab({
  alumna
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 12
    }
  }, "Datos personales"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px 20px',
      fontSize: 13,
      marginBottom: '1.5rem'
    }
  }, [['Nombre', alumna.nombre], ['Tipo', alumna.tipo], ['Teléfono', '+54 9 11 2345 6789'], ['Email', 'maria@ejemplo.com'], ['Ciclo actual', `Ciclo ${alumna.ciclo}`], ['Estado', alumna.estado]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--tm)',
      display: 'block',
      marginBottom: 1
    }
  }, k), /*#__PURE__*/React.createElement("span", null, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: btn()
  }, "Editar datos"), /*#__PURE__*/React.createElement("button", {
    style: btn('warn')
  }, "Pausar alumna")));
}
function HistorialTab() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 12
    }
  }, "Historial de ciclos"), [{
    c: 3,
    info: 'Semana 2 — en curso',
    check: '6 de 9 días'
  }, {
    c: 2,
    info: '4 semanas · completado',
    check: '✓ 11/12 días'
  }, {
    c: 1,
    info: '4 semanas · completado',
    check: '✓ 12/12 días'
  }].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0.6rem 0',
      borderBottom: '1px solid var(--b)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: '1.1rem',
      color: 'var(--vd)',
      width: 60,
      flexShrink: 0
    }
  }, "Ciclo ", h.c), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 12,
      color: 'var(--tm)'
    }
  }, h.info), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--vd)',
      fontWeight: 500
    }
  }, h.check))));
}
function NotasTab() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 12
    }
  }, "Comentarios de la alumna"), [{
    date: 'Mar 12',
    text: 'Me costó el hollow hold, ¿hay alguna variante más simple?'
  }, {
    date: 'Mar 8',
    text: 'Aumenté 2kg en sentadilla esta semana 💪'
  }, {
    date: 'Mar 5',
    text: 'Las planchas con toque de hombros me cuestan mucho.'
  }].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--s2)',
      borderRadius: 'var(--rs)',
      padding: '10px 12px',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--th)',
      marginBottom: 4
    }
  }, n.date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--t)',
      lineHeight: 1.5
    }
  }, n.text))));
}
function LinkTab({
  alumna
}) {
  const slug = alumna.nombre.split(' ')[0].toLowerCase();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 12
    }
  }, "Link personal"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--tm)',
      lineHeight: 1.6,
      marginBottom: 12
    }
  }, "Compartile este link a ", alumna.nombre.split(' ')[0], ". Lo puede instalar como app en el celular."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--s2)',
      border: '1px solid var(--bm)',
      borderRadius: 'var(--rs)',
      padding: '0.6rem 0.9rem',
      fontSize: 12,
      color: 'var(--vd)',
      fontFamily: 'monospace',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "amira-fitness.vercel.app/alumna/", slug), /*#__PURE__*/React.createElement("button", {
    style: {
      ...btn('ghost'),
      padding: '4px 12px'
    }
  }, "Copiar")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: btn('primary')
  }, "Enviar por WhatsApp"), /*#__PURE__*/React.createElement("button", {
    style: btn()
  }, "QR Code")));
}

// ─── RoutineBuilder (slice) ────────────────────────────────────────────────
function RoutineBuilder() {
  const [day, setDay] = useState(1);
  const [week, setWeek] = useState(2);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--p)',
      borderRadius: 'var(--rp)',
      padding: '4px 12px',
      fontSize: 11,
      color: 'var(--pd)',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "serif",
    style: {
      fontSize: 16,
      color: 'var(--pd)',
      lineHeight: 1
    }
  }, "3"), "Ciclo 3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--tm)'
    }
  }, "\xB7 Semana ", week, " \xB7 D\xEDa ", day)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5,
      marginBottom: 10,
      flexWrap: 'wrap'
    }
  }, [1, 2, 3, 4].map(w => /*#__PURE__*/React.createElement("button", {
    key: w,
    onClick: () => setWeek(w),
    style: {
      padding: '4px 12px',
      borderRadius: 'var(--rp)',
      fontSize: 11,
      border: '1px solid var(--bm)',
      background: week === w ? 'var(--p)' : 'var(--s)',
      color: week === w ? 'var(--pd)' : 'var(--tm)',
      borderColor: week === w ? 'transparent' : 'var(--bm)',
      fontWeight: week === w ? 500 : 400
    }
  }, "Semana ", w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 16
    }
  }, [1, 2, 3].map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => setDay(d),
    style: {
      flex: 1,
      padding: '6px 4px',
      borderRadius: 'var(--rp)',
      fontSize: 11,
      fontWeight: 500,
      border: '1px solid var(--bm)',
      background: day === d ? 'var(--v)' : 'var(--s)',
      color: day === d ? 'white' : 'var(--tm)',
      borderColor: day === d ? 'var(--v)' : 'var(--bm)'
    }
  }, "D\xEDa ", d))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--tm)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 10
    }
  }, "Ejercicios \u2014 arrastrar para reordenar"), [{
    n: 1,
    name: 'Hollow Hold',
    det: '3 series · 20-30"',
    grupo: 'Abdomen'
  }, {
    n: 2,
    name: 'Crunch sobre esfera',
    det: '3 series · 15',
    grupo: 'Abdomen'
  }, {
    n: 3,
    name: 'Sentadilla al cajón',
    det: '3 series · 10',
    grupo: 'Tren inferior'
  }, {
    n: 4,
    name: 'Isquiotibiales',
    det: '3 series · 10',
    grupo: 'Tren inferior'
  }].map(e => /*#__PURE__*/React.createElement("div", {
    key: e.n,
    style: {
      background: 'var(--s2)',
      borderRadius: 'var(--rs)',
      padding: '0.65rem 0.9rem',
      marginBottom: 6,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'grab',
      color: 'var(--th)',
      fontSize: 12,
      paddingTop: 2
    }
  }, "\u22EE\u22EE"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--s)',
      border: '1px solid var(--bm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 500,
      color: 'var(--tm)',
      flexShrink: 0
    }
  }, e.n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--t)'
    }
  }, e.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--tm)',
      marginTop: 2
    }
  }, e.det), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 9,
      background: 'var(--vl)',
      color: 'var(--vd)',
      borderRadius: 'var(--rp)',
      padding: '1px 7px',
      marginTop: 3
    }
  }, e.grupo)))), /*#__PURE__*/React.createElement("button", {
    style: {
      ...btn('primary'),
      marginTop: 10,
      width: '100%'
    }
  }, "+ Agregar ejercicio desde biblioteca"));
}
function btn(kind) {
  const base = {
    padding: '7px 14px',
    borderRadius: 'var(--rp)',
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid var(--bm)',
    background: 'var(--s)',
    color: 'var(--t)'
  };
  if (kind === 'primary') return {
    ...base,
    background: 'var(--v)',
    color: 'white',
    borderColor: 'var(--v)'
  };
  if (kind === 'warn') return {
    ...base,
    background: 'var(--a)',
    color: 'var(--ad)',
    borderColor: 'transparent'
  };
  if (kind === 'ghost') return {
    ...base,
    background: 'transparent',
    border: 'none',
    color: 'var(--tm)'
  };
  return base;
}
Object.assign(window, {
  AlumnaDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/panel/Drawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/panel/PanelApp.jsx
try { (() => {
/* global React, Sidebar, LoginScreen, Dashboard, AlumnasList, AlumnaDrawer */
const {
  useState
} = React;
function PanelApp() {
  const [authed, setAuthed] = useState(true); // start authed so the kit lands on dashboard
  const [section, setSection] = useState('alumnas');
  const [open, setOpen] = useState(null);
  if (!authed) return /*#__PURE__*/React.createElement(LoginScreen, {
    onSubmit: () => setAuthed(true)
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: section,
    onChange: setSection
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: '2rem',
      overflowY: 'auto'
    }
  }, section === 'inicio' && /*#__PURE__*/React.createElement(Dashboard, null), section === 'alumnas' && /*#__PURE__*/React.createElement(AlumnasList, {
    onOpen: setOpen
  }), section === 'rutinas' && /*#__PURE__*/React.createElement(Placeholder, {
    title: "Rutinas",
    sub: "Plantillas de ciclos reusables"
  }), section === 'biblioteca' && /*#__PURE__*/React.createElement(Biblioteca, null), section === 'registros' && /*#__PURE__*/React.createElement(Placeholder, {
    title: "Registros",
    sub: "3 alumnas esperando aprobaci\xF3n"
  }), section === 'mensajes' && /*#__PURE__*/React.createElement(Placeholder, {
    title: "Mensajes",
    sub: "WhatsApp + comentarios"
  }), section === 'config' && /*#__PURE__*/React.createElement(Placeholder, {
    title: "Configuraci\xF3n",
    sub: "Tu cuenta, Make.com, integraciones"
  })), open && /*#__PURE__*/React.createElement(AlumnaDrawer, {
    alumna: open,
    onClose: () => setOpen(null)
  }));
}
function Placeholder({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: '1.6rem',
      marginBottom: '0.5rem'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--tm)'
    }
  }, sub), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: '3rem',
      background: 'var(--s)',
      border: '1px dashed var(--bm)',
      borderRadius: 'var(--r)',
      textAlign: 'center',
      color: 'var(--tm)',
      fontSize: 13
    }
  }, "Secci\xF3n stub \u2014 la app real tiene CRUD completo aqu\xED."));
}
function Biblioteca() {
  const ejercicios = [{
    name: 'Hollow Hold',
    grupo: 'Abdomen',
    equip: 'Sin equipo'
  }, {
    name: 'Sentadilla al cajón',
    grupo: 'Piernas',
    equip: 'Cajón'
  }, {
    name: 'Press de banca',
    grupo: 'Pecho',
    equip: 'Barra'
  }, {
    name: 'Remo cerrado',
    grupo: 'Espalda',
    equip: 'Polea'
  }, {
    name: 'Vuelos laterales',
    grupo: 'Hombros',
    equip: 'Mancuernas'
  }, {
    name: 'Russian Twist',
    grupo: 'Abdomen',
    equip: 'Disco'
  }, {
    name: 'Plancha lateral',
    grupo: 'Abdomen',
    equip: 'Sin equipo'
  }, {
    name: 'Curl bíceps',
    grupo: 'Brazos',
    equip: 'Mancuernas'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: '1.6rem',
      marginBottom: '1rem'
    }
  }, "Biblioteca de ejercicios"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar ejercicio\u2026",
    style: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid var(--bm)',
      borderRadius: 'var(--rs)',
      fontSize: 13,
      background: 'var(--s2)'
    }
  }), /*#__PURE__*/React.createElement("select", {
    style: {
      padding: '8px 12px',
      border: '1px solid var(--bm)',
      borderRadius: 'var(--rs)',
      fontSize: 13,
      background: 'var(--s2)'
    }
  }, /*#__PURE__*/React.createElement("option", null, "Todos los grupos"), /*#__PURE__*/React.createElement("option", null, "Abdomen"), /*#__PURE__*/React.createElement("option", null, "Piernas")), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--v)',
      color: 'white',
      borderRadius: 'var(--rp)',
      padding: '8px 18px',
      fontSize: 12,
      fontWeight: 500
    }
  }, "+ Nuevo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 10
    }
  }, ejercicios.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.name,
    style: {
      background: 'var(--s)',
      border: '1px solid var(--b)',
      borderRadius: 'var(--rs)',
      padding: '0.85rem 1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--t)'
    }
  }, e.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--tm)',
      marginTop: 3
    }
  }, e.equip), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 9,
      background: 'rgba(29,158,117,0.1)',
      color: 'var(--vd)',
      borderRadius: 'var(--rp)',
      padding: '1px 7px',
      marginTop: 6
    }
  }, e.grupo)))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(PanelApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/panel/PanelApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/panel/Sidebar.jsx
try { (() => {
/* global React */

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({
  active,
  onChange
}) {
  const items = [{
    sec: 'PRINCIPAL'
  }, {
    id: 'inicio',
    icon: '🏠',
    label: 'Inicio'
  }, {
    id: 'alumnas',
    icon: '👥',
    label: 'Alumnas',
    badge: 3
  }, {
    id: 'rutinas',
    icon: '📋',
    label: 'Rutinas'
  }, {
    id: 'biblioteca',
    icon: '📚',
    label: 'Biblioteca'
  }, {
    sec: 'GESTIÓN'
  }, {
    id: 'registros',
    icon: '📝',
    label: 'Registros'
  }, {
    id: 'mensajes',
    icon: '💬',
    label: 'Mensajes'
  }, {
    id: 'config',
    icon: '⚙️',
    label: 'Configuración'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: sbStyles.bar
  }, /*#__PURE__*/React.createElement("div", {
    style: sbStyles.brand
  }, /*#__PURE__*/React.createElement("div", {
    style: sbStyles.logo
  }, "A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: sbStyles.name
  }, "Amira Fitness"), /*#__PURE__*/React.createElement("span", {
    style: sbStyles.role
  }, "Panel \xB7 Profesora"))), items.map((it, i) => it.sec ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: sbStyles.sec
  }, it.sec) : /*#__PURE__*/React.createElement("button", {
    key: it.id,
    onClick: () => onChange(it.id),
    style: {
      ...sbStyles.nav,
      ...(active === it.id ? sbStyles.navActive : {})
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: sbStyles.icon
  }, it.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.label), it.badge && /*#__PURE__*/React.createElement("span", {
    style: sbStyles.badge
  }, it.badge))), /*#__PURE__*/React.createElement("div", {
    style: sbStyles.bot
  }, /*#__PURE__*/React.createElement("div", {
    style: sbStyles.conn
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...sbStyles.dot,
      background: 'var(--v)'
    }
  }), "Conectado \xB7 Supabase"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--th)',
      padding: '0 12px'
    }
  }, "v1.4.0")));
}
const sbStyles = {
  bar: {
    width: 230,
    flexShrink: 0,
    background: 'var(--s)',
    borderRight: '1px solid var(--b)',
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minHeight: '100vh'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: '1.5rem',
    padding: '0 0.5rem'
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: 'var(--vl)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Serif Display',serif",
    fontSize: 14,
    color: 'var(--vd)'
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    display: 'block',
    color: 'var(--t)'
  },
  role: {
    fontSize: 11,
    color: 'var(--tm)'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0.55rem 0.75rem',
    borderRadius: 'var(--rs)',
    fontSize: 13,
    color: 'var(--tm)',
    width: '100%',
    textAlign: 'left',
    transition: 'all .15s var(--ease)'
  },
  navActive: {
    background: 'var(--vl)',
    color: 'var(--vd)',
    fontWeight: 500
  },
  icon: {
    width: 18,
    textAlign: 'center',
    fontSize: 14
  },
  sec: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'var(--th)',
    padding: '0.4rem 0.75rem 0.2rem',
    marginTop: '0.5rem'
  },
  badge: {
    background: 'var(--rd)',
    color: 'white',
    borderRadius: 99,
    fontSize: 10,
    padding: '1px 6px'
  },
  bot: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    paddingTop: 12,
    borderTop: '1px solid var(--b)'
  },
  conn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '0.4rem 0.75rem',
    fontSize: 11,
    color: 'var(--tm)'
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    flexShrink: 0
  }
};

// ─── LoginScreen ───────────────────────────────────────────────────────────
function LoginScreen({
  onSubmit
}) {
  const [v, setV] = React.useState('');
  const [err, setErr] = React.useState(false);
  function go(e) {
    e?.preventDefault();
    if (v === 'amira') {
      onSubmit();
    } else setErr(true);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: lgStyles.wrap
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: go,
    style: lgStyles.box
  }, /*#__PURE__*/React.createElement("div", {
    style: lgStyles.logo
  }, "A"), /*#__PURE__*/React.createElement("h2", {
    className: "serif",
    style: lgStyles.title
  }, "Panel de Amira"), /*#__PURE__*/React.createElement("p", {
    style: lgStyles.sub
  }, "Ingres\xE1 tu contrase\xF1a para continuar"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Contrase\xF1a",
    style: lgStyles.input,
    value: v,
    onChange: e => {
      setV(e.target.value);
      setErr(false);
    },
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: lgStyles.btn
  }, "Entrar"), err && /*#__PURE__*/React.createElement("div", {
    style: lgStyles.err
  }, "Contrase\xF1a incorrecta. Prob\xE1 ", /*#__PURE__*/React.createElement("em", null, "\"amira\""), ".")));
}
const lgStyles = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)'
  },
  box: {
    background: 'var(--s)',
    border: '1px solid var(--b)',
    borderRadius: 'var(--r)',
    padding: '2rem',
    width: '100%',
    maxWidth: 340,
    textAlign: 'center'
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: 'var(--vl)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Serif Display',serif",
    fontSize: 24,
    color: 'var(--vd)',
    margin: '0 auto 1rem'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.25rem'
  },
  sub: {
    fontSize: 13,
    color: 'var(--tm)',
    marginBottom: '1.5rem'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid var(--bm)',
    borderRadius: 'var(--rs)',
    fontSize: 14,
    background: 'var(--s2)',
    marginBottom: 10,
    textAlign: 'center'
  },
  btn: {
    width: '100%',
    padding: 10,
    background: 'var(--v)',
    color: 'white',
    borderRadius: 'var(--rs)',
    fontSize: 14,
    fontWeight: 500
  },
  err: {
    fontSize: 12,
    color: 'var(--rd)',
    marginTop: 8
  }
};
Object.assign(window, {
  Sidebar,
  LoginScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/panel/Sidebar.jsx", error: String((e && e.message) || e) }); }

})();
