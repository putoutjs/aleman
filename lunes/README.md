# lunes

`lunes` is a context menu for the browser. It is the new version of `menu`.

`lunes` keeps the whole menu state in one string. The string is Putout code. Each key press and each mouse event changes this code with a Putout transform. Then Putout builds the HTML of the menu from the new code.

The text of this file uses ASD-STE100 Simplified Technical English.

## Use

```js
import {createMenu} from 'aleman/lunes/bundle';

const menu = await createMenu('js-fm', {
    name: 'context',
    icon: true,
    beforeShow: ({x, y, name}) => true,
}, {
    View: () => {},
    Edit: () => {},
    New: {
        File: () => {},
        Directory: () => {},
    },
});

menu.show(100, 200);
menu.hide();
```

`createMenu(elementName, options, menu)`:

| Parameter | Meaning |
|---|---|
| `elementName` | The value of `data-name` of the element. The menu opens on a right click inside this element. |
| `options` | The options of the menu (see the next table). |
| `menu` | An object. A key is a label. A function is an item. An object is a submenu. |

A label can have spaces and parentheses, for example `Upload To Cloud` or `(Un)Select All`. A label must not have a dot.

There are two entry points:

- `aleman/lunes/bundle`: the menu with the CSS and without an import map. Use it with a bundler.
- `aleman/lunes`: the menu that loads Putout and the other modules from a CDN with an import map. Use it in a plain page.

### Options

| Option | Default | Meaning |
|---|---|---|
| `name` | `'menu'` | The name of the menu. It goes to `data-name="aleman-hydrate-<name>"` and to the hooks. |
| `icon` | `false` | When `true`, each item gets the classes `icon icon-<label>`. |
| `infiniteScroll` | `false` | When `true`, the cursor goes from the last item to the first item. |
| hooks | no hook | See the next table. |

### Hooks

All hooks are synchronous.

| Hook | When | Parameters | Result |
|---|---|---|---|
| `beforeShow` | Before the menu opens | `{x, y, name, position}` | `false` cancels the show. If the menu is open, it closes without the hide hooks. |
| `afterShow` | After the menu opens | none | none |
| `beforeHide` | Before the menu closes | none | none |
| `beforeClose` | After `beforeHide`, when an item is clicked | none | A truthy result keeps the menu open. |
| `afterHide` | After the menu closes | none | none |
| `beforeClick` | Before an item runs | the path of the item | A truthy result skips the function of the item. The menu still closes. |
| `afterClick` | After an item runs | the path of the item | none |

Order when the user clicks an item: `beforeClick`, `beforeHide`, `beforeClose`, hide, `afterHide`, the function of the item, `afterClick`. When the menu is already hidden, `hide()` calls no hook.

### Keys

| Key | Operation |
|---|---|
| `ArrowDown`, `j` | next item |
| `ArrowUp`, `k` | previous item |
| `ArrowRight`, `l` | open the submenu |
| `ArrowLeft`, `h` | close the submenu |
| `gg`, `^` | first item |
| `G`, `$` | last item |
| `Enter` | run the item |
| `Escape` | hide the menu |

A number before `j` or `k` moves the cursor more than one item, for example `5j`. The keys work only when the menu is open.

## How it works

```text
 DOM event ──► engine ──► state ──► render ──► DOM
 (key, click)  (listen)   (commit)   (build)   (innerHTML)
                 ▲                                 │
                 └────────── hydrate-menu ◄────────┘
                       (hooks, API, wiring)
```

One event goes through five parts.

1. **Actions** (`actions/*.json`). A JSON file says which event starts which operation. Example: `"keys": ["j"], "operations": ["next"]`.
2. **Engine** (`engine/`). `listen` adds the DOM listeners for the actions. It makes an async iterator. Each event gives `[operations, options]`. `createLoop` reads the iterator and calls `compile` for each operation. `vim.js` reads the number prefix and the `gg` command.
3. **State** (`state/`). The state is a string of Putout code.
4. **Compiler** (`compiler/`). `compile(operation, options)` does three things: it commits the operation to the state, it finds the position of the menu, and it renders the state to HTML.
5. **Render** (`render/`). A Putout rule, `build-menu`, reads the state and makes the HTML.

`hydrate-menu.js` connects all parts to the page. It also calls the hooks, runs the item functions, and makes the API (`show`, `hide`).

### The state

The state is an array in Putout rule-config style:

```js
['on', 'no-cursor', {
    'View': 'cursor',
    'Upload To Cloud': null,
    'New': ['off', {
        File: null,
    }],
}];
```

- The first value is `'on'` (the menu or submenu is open) or `'off'`.
- `'no-cursor'` (top level only) means that no item is selected.
- The converter writes a key that is an identifier without quotes and with no value: `{view}`. It writes other keys with quotes and the value `null`. Both forms are valid. The example above uses quotes for all keys.
- The value `'cursor'` marks the selected item.
- A nested array is a submenu.

An operation is a Putout transform (`state/transformer/transforms/`): `show`, `hide`, `next`, `prev`, `first`, `last`, `left`, `right`, `reset`. A transform uses the rules in `state/transformer/rules/` (`add-cursor`, `move-cursor`, `put-cursor`, `enter-submenu`, `leave-submenu`, `apply-visibility`, `reset-cursor`). Each transform changes the code one time (`fixCount: 1`).

`getCursorPath(state)` (`state/getter`) returns the path of the selected item, for example `New.File`.

### The position

`engine/position/calculate.js` finds the place of the menu from the pointer. It moves the menu up by 14 pixels. It flips the menu to the left or to the top when the menu does not fit in the window. The size of the menu comes from `getComputedStyle`. This is the same as in `menu`. `menu.show(x, y)` uses the same way as a right click.

### The render

`build-menu` makes this HTML:

```html
<ul class="menu menu-hidden|…" style="left: 10px; top: 20px">
    <li data-name="menu-item" class="menu-item icon icon-view menu-item-selected">
        <label data-menu-path="View">View</label>
    </li>
    <li data-name="menu-item" class="menu-item menu-submenu menu-item-selected menu-submenu-show">
        <label data-menu-path="New">New</label>
        <ul class="menu">…</ul>
    </li>
</ul>
```

- The classes are the same as the classes of `menu`. The CSS file `menu.css` has the same content as the CSS of `menu`.
- The parent of an open submenu has the class `menu-item-selected`.
- The text of a label and the value of `data-menu-path` are escaped.

## Files

| Path | Content |
|---|---|
| `lunes.js` | `createMenu` for a plain page: import map and a style link |
| `bundle.js`, `create-bundle-menu.js` | `createMenu` for a bundler: CSS as text |
| `hydrate-menu.js` | The wiring: events, hooks, API |
| `hooks.js` | The list of hooks and the default no-op |
| `dom.js` | The functions that find, create and style the elements |
| `importmap.js` | The import map for the plain page |
| `actions/` | The JSON files of the actions |
| `engine/` | `listen`, `emit`, `createLoop`, `vim`, `position/calculate` |
| `state/` | The state, the converter from the `menu` object, the transforms, the getter |
| `compiler/` | `createCompiler` |
| `render/` | The `build-menu` rule |
| `fixture/` | A fake DOM for the unit tests |
| `menu.css` | The style of the menu |

## Tests

The tests use `supertape`. The unit tests do not need a browser (they use the fake DOM in `fixture/`).

```bash copy
tape 'lunes/**/*.spec.js'
madrun coverage:lunes
```

`madrun coverage:lunes` must show 100 % for lines, branches, functions and statements.

The e2e tests use Playwright. The project `lunes` runs the tests of the page `example/lunes`. The same tests run for `menu`, to show that the behavior is the same.

```bash copy
playwright test --project=lunes
```

## Differences from `menu`

| | `menu` | `lunes` |
|---|---|---|
| State | Mutable object | A string of Putout code |
| `beforeShow` | A falsy result hides the menu | Only `false` cancels |
| Hooks | `beforeShow`, `beforeHide` | 7 hooks (see the table) |
| `beforeShow` parameters | `{...state, position}` | `{x, y, name, position}` |
| Label with a dot | Does not work | Does not work |

The look and the behavior in Cloud Commander are the same as for `menu`. The e2e tests in Cloud Commander check this: `test-e2e/client/menu-look`.
