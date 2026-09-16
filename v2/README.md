# v2 — Aleman v2 framework

New framework layer. It does not replace `aleman/` — that stays untouched.
`menos` (the next menu component) will be built on top of `v2/`.

## Architecture

```
createComponent(element, config)        ← one function, consumer entry point
        ↓
addons  [{keys/events/vim, command}]    ← declarative, no logic, no imports
        ↓
commands  {name: (state) => state}      ← pure functions, only thing to write
        ↓
rules  {name: putout rule}              ← pure transform, JSX in → JSX out
        ↓
🐊 putout                               ← infrastructure, unchanged
```

Fixed layer borders:

- addons declare which command to call — they contain zero logic
- commands receive state, return new state — they do not touch DOM
- rules receive state via options, transform JSX — they do not read commands
- nothing crosses layers except through `createComponent`

## State model

Replaces `MutationObserver` + hidden DOM element with a plain in-memory store:

```js
const store = createStore(initial);

store.getState();
store.setState(patch); // merge + notify
store.subscribe(fn); // render on change
```

Direct call: `setState` → `listener` → `render`. No JSON round-trip, no DOM
element, no `MutationObserver`, no `fullstore`.

## DSL factory

Consumer defines the schema once, framework derives `parse`/`print`:

```js
const dsl = createDSL({
    marks: {
        selected: '+',
        unselected: '-',
    },
    suffixes: {
        submenuClosed: '*',
        submenuOpen: '>',
    },
    indent: '    ',
});
```

Round-trip invariant: `print(parse(source)) === source`.

## Files

| File        | Step | Status                                                                       |
|:-------------|:------|:------------------------------------------------------------------------------|
| `render.js` | V0   | re-exports `createRender` from `../aleman/render.js` — reuse, no duplication |
| `state.js`  | V1   | `createStore`                                                                |
| `dsl.js`    | V2   | `createDSL`                                                                  |
| `addons.js` | V3   | `wireAddons`                                                                 |
| `index.js`  | V4   | `createComponent` (currently a temporary re-export of `render.js`)           |

## Testing

- unit: `bun run test` (glob includes `v2/**/*.spec.js`)
- no browser needed: mock store/commands/element for `addons.spec.js`
- integration for `index.spec.js` uses a real putout rule and minimal HTML
  template via `createRender` directly
