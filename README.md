# Aleman

![image](https://github.com/user-attachments/assets/32b3499d-1490-43d3-bdd1-84d646432c82)

> **ぶしどうとはしぬこととみつけたり。**
>
> *Bushidō to wa shinu koto to mitsuketari.*
>
> **"The way of the warrior is found in death."**
>
> **はがくれ』**
>
> Yamamoto Tsunetomo, Hagakure

🐊Putout-based framework for web.

## Install

```
bun i aleman
```

## Rules and Addons

Aleman supports two main concepts:

- ✅ addons - events;
- ✅ rules - 🐊**Putout** rules that changes HTML;

All interaction with DOM made using rules, and we interact not with DOM directly, but with JSX AST.
It makes testing simple, states predictable and independent.

### Addons

Addon responsible for UI and interfaction with outer world: clicks, fetches and everything like this.
Aleman supports next types of addons:

- ✅ [Global](#globals);
- ✅ [Events](#events);
- ✅ [Keys](#keys);
- ✅ [Vim](#vim);

When you need to filter out events according to `state` use `filter`:

```js
export const filter = ({state}) => state.command === 'show';
```

#### Global

Any browser event you need to listen globally:

```js
export const events = ['click'];
export const listener = () => ({
    command: 'hide',
    index: -1,
    showSubmenu: false,
    insideSubmenu: false,
});
```

#### Events

Any browser event you need to listen according to element with `data-name="hello":

```js
export const name = 'hello';
export const events = ['click'];
export const listener = () => ({
    command: 'hide',
    index: -1,
    showSubmenu: false,
    insideSubmenu: false,
});
```

#### Keys

```js
export const keys = ['Escape'];

export const listener = ({state, options}) => {
    options.beforeHide?.(state);
    return {
        command: 'hide',
        showSubmenu: false,
        index: -1,
    };
};
```

### Vim

```js
import * as up from './up.js';

export const commands = ['gg'];

export function listener({state, options}) {
    const {
        insideSubmenu,
        index,
        submenuIndex,
    } = state;
    
    const newState = {
        ...state,
        index: insideSubmenu ? index : 1,
        submenuIndex: insideSubmenu ? 1 : submenuIndex,
    };
    
    return up.listener({
        state: newState,
        options,
    });
}
```

## Licence

MIT
