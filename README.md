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

## Install

```
bun i aleman
```

## Usage Example

Addon:

```js
export const events = ['keydown'];

export const filter = ({event, state}) => {
    if (event.key !== 'ArrowDown')
        return false;
    
    const {command} = state['menu-toggler'] || {
        command: 'show',
    };
    
    return command !== 'hide';
};

export const listener = ({state, render, element}) => {
    const index = element.index || 0;
    
    render('select-next', {
        index: index + 1,
    });
};
```

## Licence

MIT
