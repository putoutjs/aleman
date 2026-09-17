# Browser bundles

Run `bun run build` from the repository root. Rspack emits three ESM files in `dist/`:

- `menu.bundle.js`: legacy menu API with Putout and CSS included.
- `menos.bundle.js`: Menos with Putout and CSS included; no import map or CDN required.
- `menos.js`: Menos with CSS included, leaving `putout` and `@putout/processor-html` as external ESM imports. CI enforces a size below 51,200 bytes.

Both Menos bundles accept the legacy three-argument call:

```js
import {createMenu} from './dist/menos.bundle.js';

const menu = await createMenu('workspace', {name: 'menu'}, {
    Open: () => console.log('Open'),
});
menu.show(100, 100);
menu.hide();
```

The two-argument Menos form, with the callback map in `options.menu`, also works. The wrapper includes the existing Nemo stylesheet once per document. This adapter provides the legacy call shape; it is not a guarantee of compatibility with every legacy option or hook.

For `menos.js`, configure the two external ESM dependencies in your bundler or import map. They must provide the same named exports as `@putout/bundle@5.5.1` and `@putout/processor-html@14`. These are module imports, not `window.putout` globals. The local `example/menos/external.html` demonstrates an import map using installed dependencies; those `node_modules` URLs are for development only.

The original source entry points and their esm.sh loading paths are unchanged. The legacy bundle now uses `menu/bundle.js`, also exported as `aleman/menu/bundle`, with static hydration and CSS imports and no import-map injection. `menu/menu.js` remains unchanged for runtime URL consumers.

Run `bunx madrun test:e2e:bundle` to build and test all three emitted artifacts in Chromium. The tests block remote requests and verify rendering, callback dispatch, dismissal, and reopening. The bundle examples are served by Playwright's configured local web server.

Rspack currently reports a dynamic-import warning from Putout's optional plugin loader. The bundled menu rules are supplied directly and do not use that loader. Additional runtime-loaded plugins are not covered by these bundles or tests.
