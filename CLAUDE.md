# SkylineAlpha

Mock company website for a tech infrastructure platform company. WebGL scroll-driven animation with a decoupled pagination system for content overlays.

## Architecture

```
                    ┌──────────────────────────────────┐
                    │         WebGL Canvas (z:0)        │
                    │  Raymarched SDF shapes, grayscale │
                    │  Driven by scroll position        │
                    └──────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
┌─────────────────┐   ┌──────────────────────┐   ┌────────────────────┐
│ Scroll Cards    │   │   Page Overlays      │   │   Chrome (z:10)    │
│ (z:3)           │   │   (z:2)              │   │   Nav, HUD, dots,  │
│ Scene-tracking  │   │   Full content       │   │   theme toggle,    │
│ summary + CTA   │   │   panels             │   │   credit           │
│ Visible during  │   │   Visible when       │   └────────────────────┘
│ scroll          │   │   page is opened     │
└─────────────────┘   └──────────────────────┘
```

### Two independent control axes

| Axis | Input | Controls | State variables |
|------|-------|----------|-----------------|
| **Scroll** | Wheel / touch | Shape morphing (5 SDF scenes), HUD, scroll cards | `tgt`, `smooth`, `velocity` |
| **Pagination** | Click (dot / CTA / nav) | Page overlay visibility, shape horizontal pan | `activePage`, `targetOff`, `smoothOff` |

Scroll never affects pagination. Pagination never affects scroll. Scrolling while a page is open closes the page.

### Key files

| File | Purpose |
|------|---------|
| `index.html` | Page structure: nav, HUD, dot strip, scroll spacer, 5 scroll cards, 5 page overlays, credit |
| `style.css` | Full design system: tokens, layout, components, reveal animations, responsive breakpoint |
| `main.js` | WebGL shader + compilation, scroll/velocity system, pagination state machine, HUD, theme |

## Design System

### Color — Monotone Grayscale

No chromatic color anywhere — CSS or shader. Accent is white (dark) or near-black (light).

| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#0a0a0a` | `#f0f0f0` |
| `--fg` | `#e0e0e0` | `#0d0d0d` |
| `--muted` | `#666666` | `#999999` |
| `--accent` | `#ffffff` | `#1a1a1a` |
| `--card-bg` | `rgba(10,10,10,0.82)` | `rgba(240,240,240,0.88)` |
| `--card-border` | `rgba(255,255,255,0.15)` | `rgba(26,26,26,0.18)` |

Theme is toggled via `data-theme` attribute on `<html>`. CSS variables swap automatically. WebGL background (`uBg` uniform) must also be updated via `updateBg()`.

### Typography

| Role | Font | Sizing |
|------|------|--------|
| Display (h1, h2, stat-num, sc-title) | Bebas Neue | `clamp(2rem, Xvw, Yrem)`, `line-height: 0.92` |
| Body / UI (everything else) | DM Mono 300/400 | `0.55rem` – `0.78rem`, `letter-spacing: 0.08em – 0.25em` |

All text is uppercase (`text-transform: uppercase`) except body-text paragraphs.

### Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--ui-inset` | `2rem` | Outer margin for all chrome elements |
| `--nav-x` | `calc(--ui-inset + 0.125rem)` | Dot strip and theme toggle horizontal position |
| `--hairline` | `0.0625rem` (1px) | All borders |
| Pane padding | `6rem 4rem` (desktop), `5rem 1.5rem` (mobile) | |

### Split-screen page layout

Page overlays use a **50/50 split-screen** design. The `.text-card` is a full-viewport-height frosted glass pane taking 50% of the screen width. The WebGL shape occupies the other 50%, centered in its half. The `.page` container uses `align-items: stretch` (no padding) so the pane spans edge to edge vertically.

| Class | Alignment | Border (dividing edge) | Shape half |
|-------|-----------|------------------------|------------|
| `.text-card` (default) | Left 50% | `border-right` | Right |
| `.text-card.right` | Right 50% (`margin-inline-start: auto`) | `border-left` | Left |

The pane uses `backdrop-filter: blur(12px)` for a frosted glass effect over the WebGL canvas. Content is vertically centered via `flex-direction: column; justify-content: center`.

On mobile (`≤ 37.5em`), panes go `width: 100%` — no split.

Scroll cards (`.scroll-card`) are a separate component — always left-aligned with `border-left`, `max-width: 22rem`.

### Pagination pan directions

Pages alternate which half the shape occupies. The shape is centered in the non-content half via `canvas.width / (4 * min(w, h))` offset. Positive `uOff` in the shader shifts the viewport left, making the shape appear on the right — so `panDir` is negative when the card is on the right (to push the shape left).

| Page | panDir | Shape half | Content pane |
|------|--------|-----------|--------------|
| 0 (Hero) | `0` | Centered (visible through pane) | Left |
| 1 (About) | `-1` | Left | Right |
| 2 (Platform) | `1` | Right | Left |
| 3 (Work) | `-1` | Left | Right |
| 4 (Contact) | `1` | Right | Left |

### Component inventory

| Component | CSS class | Used in |
|-----------|-----------|---------|
| Tag label | `.tag`, `.sc-tag` | All cards |
| Horizontal rule | `.h-line` | Page cards (not hero) |
| Stat row | `.stat-row > .stat` | About, Contact pages |
| Project list | `.project-list > .project-item` | Platform page |
| Case study list | `.case-list > .case-item` | Work page |
| Contact grid | `.contact-grid > .contact-block` | Contact page |
| CTA button | `.cta`, `.sc-cta` | All cards |

### Reveal animation system

Page overlay children start at `opacity: 0` and animate in when `.page.active` is applied via CSS parent selector. Staggered delays:

```
.tag         →  0s
h1/h2        →  0.06s
.body-text   →  0.14s
lists/grids  →  0.22s
.stat-row    →  0.26s
.cta         →  0.32s
.h-line      →  scale 0→1 (no delay)
```

Scroll cards use a different system: `translate: 0 0.5rem → 0 0` with `opacity` transition on `.scroll-card.active`.

## WebGL Shader

### SDF Scenes (scroll-driven)

| Index | Name | Geometry | Animation |
|-------|------|----------|-----------|
| 0 | ORIGIN | Breathing sphere | Radius oscillates via `sin(t * 1.3)` |
| 1 | TORUS | Rotating torus | XZ rotation at `t * 0.6` |
| 2 | LATTICE | Tumbling box | XY + YZ dual rotation |
| 3 | PRISM | Spinning octahedron | XY rotation at `t * 0.5` |
| 4 | HELIX | Interlocked double-torus | Two tori at offset rotations |

Scenes blend via `mix()` controlled by `uSc` (scene index) and `uBl` (blend factor 0→1).

### Uniforms

| Uniform | Type | Source |
|---------|------|--------|
| `uR` | vec2 | Canvas resolution (px) |
| `uT` | float | Time (seconds since load) |
| `uS` | float | Scroll progress (0→1) — drives `pal()` |
| `uSc` | float | Scene index (0→3) |
| `uBl` | float | Blend factor (0→1) between scenes |
| `uOff` | float | Horizontal camera offset (pagination pan) |
| `uBg` | vec3 | Background color (synced with CSS theme) |

### Surface effects

Three procedural texture layers on all shapes:

1. **Noise bands** — `noise3(vec3(p.x*3, p.y*8 - uT*0.08, p.z*3))` — horizontal streaks drifting upward. Hardened via `smoothstep(.35,.65)`. Adds `0.12` max brightness.

2. **Edge pulse** — `sin(p.y*6 - uT*0.6)` raised to power 12, multiplied by Fresnel. A thin bright ring sweeping vertically along silhouette edges.

3. **Brushed specular** — `noise3(p*28 + uT*0.1)` modulates the specular highlight, creating irregular grain like milled metal.

### Camera

- Ray origin: `vec3(0, 0, 2.4)`
- Ray direction: `normalize(vec3(suv, -1.2))` where `suv` is UV offset by `uOff`
- Vignette uses viewport-centered UV (not offset) — stays screen-fixed during pan

## Interaction Model

### Scroll
- `#scroll-spacer` provides 500vh of scroll height
- Custom wheel handler with velocity damping (`0.85^(dt*60)` decay, ±600 cap)
- `smooth` chases `tgt` via exponential easing (`1 - exp(-dt * 8)`)
- Scroll cards swap based on current scene index in the frame loop

### Pagination
- `openPage(i)` — sets `targetOff`, toggles `.page.active`, hides scroll cards
- `closePage()` — resets offset to 0, removes `.active`, shows scroll cards
- `smoothOff` chases `targetOff` via exponential easing (`1 - exp(-dt * 5)`)
- Clicking same page again closes it (toggle behavior)
- Any scroll input (wheel) calls `closePage()`

### Navigation entry points
- **Dot strip** — 5 clickable dots, left edge, hover shows label via `::after`
- **Top nav links** — About, Platform, Work, Contact
- **CTA buttons** — in both scroll cards and page overlays
- **Wordmark** — clicks to page 0

## Development

```bash
npm run dev    # serves on localhost:3000 via npx serve
```

## Deployment

Static deploy on Vercel. GitHub repo connected — pushes to `main` auto-deploy to production.

- **Repo**: github.com/skyline-development-hub/skylinealpha
- **Production URL**: skylinealpha.vercel.app

## Conventions

- **Static vanilla JS** — no frameworks, no build tools, no bundlers
- **Monotone grayscale only** — never introduce chromatic color in CSS or shader
- **Two-axis independence** — scroll and pagination must never affect each other
- **Theme sync** — any CSS theme change must also call `updateBg()` for the WebGL uniform
- **Shader effects are additive** — each texture layer adds to `col`, never multiplies or replaces
- **Split-screen panes** — content pane takes 50% width, shape centered in opposite half (panDir: `[0, -1, 1, -1, 1]`)
- **Responsive breakpoint** — single breakpoint at `37.5em` (600px), hides dot strip and nav links
- **All UI text** — DM Mono, uppercase, wide letter-spacing
- **All display text** — Bebas Neue, tight line-height (0.92)
