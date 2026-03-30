# SkylineAlpha

## Project Overview
SkylineAlpha is a company website built on a WebGL scroll-driven animation foundation. The site uses raw WebGL (no Three.js) with GLSL raymarching to render morphing SDF primitives that transition as users scroll through sections.

## Architecture
- **Static site** — vanilla HTML/CSS/JS, no framework
- **Rendering** — WebGL fragment shader with signed distance functions (sphere, torus, box, octahedron, interlocked tori)
- **Scroll system** — Custom smooth-scroll with velocity damping, drives shader uniforms for scene transitions
- **Theming** — Dark/light mode via CSS custom properties + `data-theme` attribute, synced to WebGL background color
- **Reveal animations** — IntersectionObserver-based fade-in on text cards
- **Deployment** — Static deploy on Vercel

## Key Files
- `index.html` — Page structure, 5 scroll sections with text cards and HUD overlay
- `main.js` — WebGL setup, shader compilation, scroll logic, theme toggle, reveal observer
- `style.css` — Full styling with CSS custom properties, responsive breakpoints at 37.5em

## Design System
- **Fonts**: Bebas Neue (display), DM Mono (body/UI)
- **Color scheme**: Monotone grayscale — no chromatic color anywhere (CSS or shader)
- **Dark palette**: bg `#0a0a0a`, fg `#e0e0e0`, muted `#666666`, accent `#ffffff`
- **Light palette**: bg `#f0f0f0`, fg `#0d0d0d`, muted `#999999`, accent `#1a1a1a`
- **Shader palette**: Grayscale cosine palette, white Fresnel rim — no color in `pal()` or lighting
- **Cards**: Semi-transparent with white/black border depending on theme, three alignments (left, right, center)

## Shader Details
The fragment shader uses raymarching with 96 steps against 5 SDF scenes:
1. Breathing sphere
2. Rotating torus
3. Tumbling box
4. Spinning octahedron
5. Interlocked double-torus

Scenes blend smoothly via `uBl` (blend factor) and `uSc` (scene index) uniforms driven by scroll position.

## Development
```bash
npm run dev    # serves on localhost:3000 via npx serve
```

## Conventions
- Keep the site as a static vanilla JS project — no build tools or frameworks unless explicitly decided
- Preserve the WebGL animation system as the visual foundation
- All scroll-driven state flows through the `smooth` variable interpolated from `tgt`
- Theme changes must update both CSS custom properties AND the `uBg` WebGL uniform
