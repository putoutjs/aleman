import {test} from 'supertape';
import {createDSL} from './dsl.js';

const schema = {
    marks: {
        selected: '+',
        unselected: '-',
    },
    suffixes: {
        submenuClosed: '*',
        submenuOpen: '>',
    },
    indent: '    ',
};

const dsl = createDSL(schema);

test('v2: dsl: round-trip: flat', (t) => {
    const source = '-Hello\n+World\n-ABC';
    const result = dsl.print(dsl.parse(source));
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('v2: dsl: round-trip: submenu open', (t) => {
    const source = '-Hello\n-World>\n    +File\n    -Dir';
    const result = dsl.print(dsl.parse(source));
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('v2: dsl: round-trip: submenu closed', (t) => {
    const source = '-Hello\n-World*';
    const result = dsl.print(dsl.parse(source));
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('v2: dsl: round-trip: child selected', (t) => {
    const source = '-World>\n    +File\n    -Dir';
    const result = dsl.print(dsl.parse(source));
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('v2: dsl: parse: selected', (t) => {
    const result = dsl.parse('+Hello');
    const expected = {
        items: [{
            name: 'Hello',
            selected: true,
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: dsl: parse: unselected', (t) => {
    const result = dsl.parse('-Hello');
    const expected = {
        items: [{
            name: 'Hello',
            selected: false,
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: dsl: parse: submenu closed', (t) => {
    const result = dsl.parse('-World*');
    const expected = {
        items: [{
            name: 'World',
            selected: false,
            submenu: {
                show: false,
                items: [],
            },
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: dsl: parse: submenu open', (t) => {
    const result = dsl.parse('-World>');
    const expected = {
        items: [{
            name: 'World',
            selected: false,
            submenu: {
                show: true,
                items: [],
            },
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: dsl: parse: children', (t) => {
    const result = dsl.parse('-World>\n    +File\n    -Dir');
    const expected = {
        items: [{
            name: 'World',
            selected: false,
            submenu: {
                show: true,
                items: [{
                    name: 'File',
                    selected: true,
                }, {
                    name: 'Dir',
                    selected: false,
                }],
            },
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: dsl: parse: ignores trailing empty line', (t) => {
    const result = dsl.parse('-Hello\n');
    const expected = {
        items: [{
            name: 'Hello',
            selected: false,
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: dsl: parse: empty', (t) => {
    const result = dsl.parse('');
    const expected = {
        items: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: dsl: print: leaf', (t) => {
    const result = dsl.print({
        items: [{
            name: 'Hello',
            selected: true,
        }],
    });
    
    t.equal(result, '+Hello');
    t.end();
});

test('v2: dsl: print: submenu closed: no children', (t) => {
    const result = dsl.print({
        items: [{
            name: 'World',
            selected: false,
            submenu: {
                show: false,
                items: [{
                    name: 'File',
                    selected: false,
                }],
            },
        }],
    });
    
    t.equal(result, '-World*');
    t.end();
});

test('v2: dsl: print: submenu open: children indented', (t) => {
    const result = dsl.print({
        items: [{
            name: 'World',
            selected: false,
            submenu: {
                show: true,
                items: [{
                    name: 'File',
                    selected: true,
                }],
            },
        }],
    });
    
    t.equal(result, '-World>\n    +File');
    t.end();
});

test('v2: dsl: print: empty', (t) => {
    const result = dsl.print({
        items: [],
    });
    
    t.equal(result, '');
    t.end();
});

test('v2: dsl: createDSL: custom schema', (t) => {
    const custom = createDSL({
        marks: {
            selected: 'x',
            unselected: 'o',
        },
        suffixes: {
            submenuClosed: '?',
            submenuOpen: '!',
        },
        indent: '\t',
    });
    
    const source = 'oHello\nxWorld!\n\txFile';
    const result = custom.print(custom.parse(source));
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});
