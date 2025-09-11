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

## Usage Example

Addon:

```js
export const events = ['click'];
export const filter = ({state}) => state.command === 'show';
export const listener = () => ({
    command: 'hide',
    index: -1,
    showSubmenu: false,
    insideSubmenu: false,
});
```

## Licence

MIT
