## Goal
Export the Nexxu design system as a single, portable **JSON tokens file** that downstream tools (Style Dictionary, Figma Tokens plugin, Tailwind generators) can consume.

## Output
- File: `/mnt/documents/nexxu-design-tokens.json`
- Format: **DTCG-style** (`{ "$value": ..., "$type": ..., "$description": ... }`) — the de-facto standard supported by Figma Tokens, Style Dictionary, and most token tooling.
- Delivered via `<lov-artifact>` so the user can download it directly.

## What goes inside
Sourced from `src/styles.css` (the single source of truth) plus the labels used in the design-system page:

1. **color** — full brand palette
   - Primaries: `brand-blue`, `brand-purple`, `brand-purple-deep`
   - Purple family: `purple-mid`, `purple-light`, `purple-pale`, `purple-min`
   - Accents: `teal` (success), `amber` (warning)
   - Neutrals: `dark`, `dark-2`, `page`, `text`, `muted`, `subtle`
2. **typography**
   - Font families: `display` (Space Grotesk), `sans` (Outfit)
   - Weights actually used (400–900)
3. **gradient** — `brand`, `brand-h`, `text-light`, `text-pale`, `hero-headline`
4. **shadow** — `glow`, `glow-sm`, `card`, `card-hover`
5. **radius** — base `--radius` (0.875rem) plus the sm/md/lg/xl/2xl/3xl/4xl scale
6. **semantic** (light theme mapping) — `background`, `foreground`, `primary`, `border`, etc., as references to brand tokens where applicable

Each token includes the original CSS variable name (e.g. `--brand-purple`) in `$extensions.css.var` so consumers can map back to the codebase.

## Approach
1. Read `src/styles.css` to lock in exact hex/oklch values (already inspected).
2. Generate the JSON with a small Node script writing to `/mnt/documents/`.
3. Validate it parses as JSON and spot-check 2–3 tokens against `styles.css`.
4. Emit the artifact tag for download.

## Out of scope
- No code changes inside the app (`src/`).
- No PDF/Markdown/HTML — JSON only, per your selection.
- Component primitives (buttons, badges) are not exported as tokens; they're React components, not design tokens.
