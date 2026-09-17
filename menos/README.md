# menos — menu component on v2

The next menu component, built on the `v2/` framework (`createComponent`,
`createDSL`, declarative addons, pure commands). It is the same menu as `nemo`
but written with `createComponent` — the proof that v2 is simpler.

It must pass the same e2e suite as `menu` and `nemo`:
`bunx playwright test --project=menos`.

## Layout

| File | Step | Status |
|:-----|:-----|:-------|
| `commands.js` | M1 | pure functions: `down`, `up`, `esc`, `gg`, `shift-g`, `right`, `left` |
| `rules/build-menu.js` | M2 | same rule as nemo, adapted to v2 path |
| `menos.js` | M3 | single `createComponent` call (~30 lines) |
| `bundle.js` | M5 | rspack entry for self-contained bundle |

## Files the component author writes

- `commands.js` — pure functions only, no framework imports
- `addons.js` — declarative list only, no logic
- `rules/build-menu.js` — pure putout transform, JSX in → JSX out
- `menos.js` — wiring via `createComponent`
