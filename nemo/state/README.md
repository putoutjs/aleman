# State DSL

A minimal text format for describing the state of any selectable list UI.
Used by `parseState` / `printState`. Implementation-agnostic.

## Syntax

Each line is one item: `{mark}{name}{suffix?}`

### Marks

| Mark | Meaning      |
|:------|:--------------|
| `+`  | selected     |
| `-`  | not selected |

### Suffixes

| Suffix | Meaning                 |
|:--------|:-------------------------|
| `*`    | has submenu (collapsed) |
| `>`    | has submenu (expanded)  |
| none   | leaf item               |

### Submenu children

Expanded submenu children follow on the next lines, indented 4 spaces:

```
    -File>
        +New
        -Open
    -Edit
```

## Round-trip guarantee

```
printState(parseState(source)) === source
```

## Reuse

`parseState` / `printState` live in `nemo/state/` but work for any component
with selectable items and optional single-level nesting.

## Testing pattern

```js
const test = extend({
    command: (operator) => (cmd, from, to, options) => {
        const state = parseState(from);
        const updated = updateState(cmd, state, options);
        
        return operator.equal(printState(updated), to);
    },
});

test('moves down', (t) => {
    t.command('down', '-Hello\n+World', '+Hello\n-World');
    t.end();
});
```
