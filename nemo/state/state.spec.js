import {extend} from 'supertape';
import montag from 'montag';
import {createState, updateState} from './state.js';
import {printState} from './print-state.js';
import {parseState} from './parse-state.js';

const noop = () => {};

const test = extend({
    updateState: (operator) => (command, source, expected, options) => {
        const state = parseState(source);
        const updatedState = updateState(command, state, options);
        const result = printState(updatedState);
        
        return operator.equal(result, expected);
    },
});

test('state: createState', (t) => {
    const menu = {
        Hello: noop,
        World: {
            A: noop,
            B: noop,
        },
    };
    
    const result = createState({
        name: 'hello',
        menu,
    });
    
    const expected = {
        name: 'hello',
        index: -1,
        insideSubmenu: false,
        position: {
            x: 0,
            y: 20,
        },
        show: true,
        submenuIndex: -1,
        items: [{
            name: 'Hello',
            path: 'Hello',
            selected: false,
        }, {
            name: 'World',
            path: 'World',
            selected: false,
            submenu: {
                items: [{
                    name: 'A',
                    path: 'World.A',
                    selected: false,
                }, {
                    name: 'B',
                    path: 'World.B',
                    selected: false,
                }],
                show: false,
            },
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('state: updateState: down', (t) => {
    const from = montag`
        -Hello
        -World*
    `;
    
    const to = montag`
        +Hello
        -World*
    `;
    
    t.updateState('down', from, to);
    t.end();
});

test('state: updateState: down: first selected', (t) => {
    const from = montag`
        +Hello
        -World*
    `;
    
    const to = montag`
        -Hello
        +World*
    `;
    
    t.updateState('down', from, to);
    t.end();
});

test('state: updateState: down: last selected', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const to = montag`
        -Hello
        +World
    `;
    
    t.updateState('down', from, to);
    t.end();
});

test('state: updateState: up', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const to = montag`
        +Hello
        -World
    `;
    
    t.updateState('up', from, to);
    t.end();
});

test('state: updateState: first', (t) => {
    const from = montag`
        +Hello
        -World
    `;
    
    const to = montag`
        +Hello
        -World
    `;
    
    t.updateState('up', from, to);
    t.end();
});

test('state: updateState: down: 2', (t) => {
    const from = montag`
        +Hello
        -World
        -ABC
    `;
    
    const to = montag`
        -Hello
        -World
        +ABC
    `;
    
    t.updateState('down', from, to, {
        count: 2,
    });
    t.end();
});

test.only('state: updateState: down: more', (t) => {
    const from = montag`
        +Hello
        -World
        -ABC
    `;
    
    const to = montag`
        +Hello
        -World
        -ABC
    `;
    
    t.updateState('down', from, to, {
        count: 4,
        infiniteScroll: true,
    });
    t.end();
});

test.only('state: updateState: up: couple', (t) => {
    const from = montag`
        -Hello
        -World
        +ABC
    `;
    
    const to = montag`
        +Hello
        -World
        -ABC
    `;
    
    t.updateState('up', from, to, {
        count: 4,
    });
    t.end();
});

test.only('state: updateState: up: infiniteScroll', (t) => {
    const from = montag`
        -Hello
        -World
        +ABC
    `;
    
    const to = montag`
        -Hello
        +World
        -ABC
    `;
    
    t.updateState('up', from, to, {
        count: 4,
        infiniteScroll: true,
    });
    t.end();
});
