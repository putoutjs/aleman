import {test} from 'supertape';
import {commands} from './commands.js';

const createState = (items, overrides = {}) => ({
    index: -1,
    submenuIndex: -1,
    insideSubmenu: false,
    infiniteScroll: false,
    show: true,
    items,
    ...overrides,
});

const SELECTED = true;
const UNSELECTED = false;

const createResult = (state) => ({
    index: state.index,
    submenuIndex: state.submenuIndex,
    insideSubmenu: state.insideSubmenu,
    show: state.show,
    command: state.command,
    selected: state.items.map(({selected}) => selected),
    submenus: state.items.map(({submenu}) => submenu?.show),
    submenuSelected: state.items.map(({submenu}) => submenu && submenu.items.map(({selected}) => selected)),
});

const createItems = (submenu) => ({
    leaf: [{
        name: 'hello',
        path: 'hello',
        selected: UNSELECTED,
    }, {
        name: 'world',
        path: 'world',
        selected: SELECTED,
    }],
    submenu,
});

const createSubmenuItems = (show = false) => [{
    name: 'hello',
    path: 'hello',
    selected: UNSELECTED,
}, {
    name: 'new',
    path: 'new',
    selected: SELECTED,
    submenu: {
        show,
        items: [{
            name: 'file',
            path: 'new.file',
            selected: UNSELECTED,
        }, {
            name: 'directory',
            path: 'new.directory',
            selected: UNSELECTED,
        }],
    },
}];

test('menos: commands: esc: clears selection', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 1,
    });
    
    commands.esc(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: false,
        command: 'hide',
        selected: [UNSELECTED, UNSELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: esc: closes submenu', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.esc(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: false,
        command: 'hide',
        selected: [UNSELECTED, UNSELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: no selection: selects first', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf);
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [SELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: moves to next', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 0,
        selected: [SELECTED, SELECTED],
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: last item: stays', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 1,
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: last item: infiniteScroll: wraps', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 1,
        infiniteScroll: true,
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [SELECTED, UNSELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: submenu: moves to next child', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: 1,
        insideSubmenu: true,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, true],
        submenuSelected: [undefined,
            [UNSELECTED, SELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: submenu: last child: stays', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 1,
        insideSubmenu: true,
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: 1,
        insideSubmenu: true,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, true],
        submenuSelected: [undefined,
            [UNSELECTED, SELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: submenu: last child: infiniteScroll: wraps', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 1,
        insideSubmenu: true,
        infiniteScroll: true,
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, true],
        submenuSelected: [undefined,
            [SELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: submenu: empty: noop', (t) => {
    const state = createState([{
        name: 'new',
        path: 'new',
        selected: SELECTED,
        submenu: {
            show: true,
            items: [],
        },
    }], {
        index: 0,
        insideSubmenu: true,
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: true,
        show: true,
        command: undefined,
        selected: [SELECTED],
        submenus: [true],
        submenuSelected: [
            [],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: down: submenu: no selected item: noop', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        insideSubmenu: true,
    });
    
    commands.down(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: true,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: up: no selection: noop', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf);
    
    commands.up(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: up: moves to previous', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 1,
    });
    
    commands.up(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [SELECTED, UNSELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: up: closes submenu of current', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.up(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: 0,
        insideSubmenu: true,
        show: true,
        command: undefined,
        selected: [SELECTED, UNSELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: up: first item: noop', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 0,
        selected: [SELECTED, SELECTED],
    });
    
    commands.up(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: up: first item: infiniteScroll: wraps', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 0,
        selected: [SELECTED, UNSELECTED],
        infiniteScroll: true,
    });
    
    commands.up(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: right: opens submenu', (t) => {
    const state = createState(createSubmenuItems(), {
        index: 1,
    });
    
    commands.right(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, true],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: right: leaf item: noop', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 1,
    });
    
    commands.right(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: right: no selection: noop', (t) => {
    const state = createState(createSubmenuItems());
    
    commands.right(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: left: closes submenu', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.left(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: left: leaf item: resets navigation', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.left(state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: left: no selection: resets navigation', (t) => {
    const state = createState(createSubmenuItems(), {
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.left(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: gg: selects first', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 1,
    });
    
    commands.gg(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [SELECTED, UNSELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: gg: closes submenus', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.gg(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [SELECTED, UNSELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: gg: no items: no selection', (t) => {
    const state = createState([]);
    
    commands.gg(state);
    
    const result = createResult(state);
    const expected = {
        index: 0,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [],
        submenus: [],
        submenuSelected: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: shift-g: selects last', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf, {
        index: 0,
    });
    
    commands['shift-g'](state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: shift-g: closes submenus', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 0,
    });
    
    commands['shift-g'](state);
    
    const result = createResult(state);
    const expected = {
        index: 1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: shift-g: no items: no selection', (t) => {
    const state = createState([]);
    
    commands['shift-g'](state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [],
        submenus: [],
        submenuSelected: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: reset: clears selection, keeps menu shown', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.reset(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: undefined,
        selected: [UNSELECTED, UNSELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: reset: closes nested submenus', (t) => {
    const state = createState([{
        name: 'new',
        path: 'new',
        selected: UNSELECTED,
        submenu: {
            show: true,
            items: [{
                name: 'more',
                path: 'new.more',
                selected: SELECTED,
                submenu: {
                    show: true,
                    items: [],
                },
            }],
        },
    }]);
    
    commands.reset(state);
    
    const result = [
        state.items[0].submenu.show,
        state.items[0].submenu.items[0].selected,
        state.items[0].submenu.items[0].submenu.show,
    ];
    
    const expected = [false, false, false];
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: show: sets command', (t) => {
    const {leaf} = createItems();
    const state = createState(leaf);
    
    commands.show(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        command: 'show',
        selected: [UNSELECTED, SELECTED],
        submenus: [undefined, undefined],
        submenuSelected: [undefined, undefined],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: commands: hide: hides menu', (t) => {
    const state = createState(createSubmenuItems(true), {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    });
    
    commands.hide(state);
    
    const result = createResult(state);
    const expected = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: false,
        command: 'hide',
        selected: [UNSELECTED, UNSELECTED],
        submenus: [undefined, false],
        submenuSelected: [undefined,
            [UNSELECTED, UNSELECTED],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});
