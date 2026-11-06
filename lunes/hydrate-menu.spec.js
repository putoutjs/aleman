import {test, stub} from 'supertape';
import {hydrateMenu} from './hydrate-menu.js';
import {
    createFakeElement,
    installWindow,
    tick,
    labelOf,
    notLabel,
} from './fixture/fake-dom.js';

const noop = () => {};

const create = async (options = {}, overrides = {}, windowOptions = {}) => {
    const win = installWindow(windowOptions);
    const element = createFakeElement();
    const fired = [];
    
    const menu = {
        view: () => fired.push('view'),
        edit: () => fired.push('edit'),
        new: {
            file: () => fired.push('file'),
        },
        ...overrides,
    };
    
    const instance = hydrateMenu('menu', {
        hydrateElement: element,
        options: {
            name: 'menu',
            ...options,
        },
        menu,
    });
    
    await tick();
    
    return {
        element,
        win,
        fired,
        instance,
    };
};

const isHidden = ({element}) => element.innerHTML.startsWith('<ul class="menu menu-hidden"');

const result = (ctx) => ({
    fired: ctx.fired,
    hidden: isHidden(ctx),
});

const press = async ({win}, key) => {
    win.emit('keydown', {
        key,
    });
    await tick();
};

test('lunes: hydrate: show renders the menu at the position', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(10, 20);
    
    const {innerHTML} = ctx.element;
    
    ctx.win.uninstall();
    
    t.match(innerHTML, 'left: 10px; top: 6px');
    t.end();
});

test('lunes: hydrate: show without coordinates', async (t) => {
    const ctx = await create();
    
    ctx.instance.show();
    
    const {innerHTML} = ctx.element;
    
    ctx.win.uninstall();
    
    t.match(innerHTML, 'left: 0px; top: -14px');
    t.end();
});

test('lunes: hydrate: ArrowDown moves the cursor', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    await press(ctx, 'ArrowDown');
    
    const {innerHTML} = ctx.element;
    
    ctx.win.uninstall();
    
    t.match(innerHTML, 'menu-item-selected');
    t.end();
});

test('lunes: hydrate: keys are ignored while the menu is hidden', async (t) => {
    const ctx = await create();
    
    await press(ctx, 'ArrowDown');
    
    const result = ctx.element.innerHTML;
    
    ctx.win.uninstall();
    
    t.equal(result, '');
    t.end();
});

test('lunes: hydrate: Enter runs the item and hides the menu', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    await press(ctx, 'ArrowDown');
    await press(ctx, 'Enter');
    
    ctx.win.uninstall();
    
    const expected = {
        fired: ['view'],
        hidden: true,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: Enter on a submenu parent does nothing', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    await press(ctx, 'ArrowUp');
    await press(ctx, 'Enter');
    
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: false,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: click on a label runs the item and hides', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    ctx.element.emit('click', {
        target: labelOf('edit'),
    });
    
    ctx.win.uninstall();
    
    const expected = {
        fired: ['edit'],
        hidden: true,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: click on a submenu parent keeps the menu', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    ctx.element.emit('click', {
        target: labelOf('new'),
    });
    
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: false,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: click not on a label does nothing', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    ctx.element.emit('click', {
        target: notLabel,
    });
    
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: false,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: click outside hides the menu', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    ctx.win.emit('click', {
        target: {},
    });
    
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: true,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: click inside the menu does not hide it', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    ctx.win.emit('click', {
        target: ctx.element,
    });
    
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: false,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: click outside while hidden does nothing', async (t) => {
    const ctx = await create();
    
    ctx.win.emit('click', {
        target: {},
    });
    
    ctx.win.uninstall();
    
    t.equal(ctx.element.innerHTML, '');
    t.end();
});

test('lunes: hydrate: mouseleave resets the cursor', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    await press(ctx, 'ArrowDown');
    ctx.element.emit('mouseleave', {
        target: {
            parentElement: ctx.element,
        },
    });
    
    ctx.win.uninstall();
    
    t.notMatch(ctx.element.innerHTML, 'menu-item-selected');
    t.end();
});

test('lunes: hydrate: mouseleave of a nested element is ignored', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    await press(ctx, 'ArrowDown');
    ctx.element.emit('mouseleave', {
        target: {
            parentElement: {},
        },
    });
    
    ctx.win.uninstall();
    
    t.match(ctx.element.innerHTML, 'menu-item-selected');
    t.end();
});

test('lunes: hydrate: contextmenu shows the menu at the pointer', async (t) => {
    const ctx = await create();
    
    ctx.win.emit('contextmenu', {
        target: inside('menu'),
        clientX: 30,
        clientY: 40,
    });
    await tick();
    
    ctx.win.uninstall();
    
    t.match(ctx.element.innerHTML, 'left: 30px; top: 26px');
    t.end();
});

test('lunes: hydrate: hide hides the menu', async (t) => {
    const ctx = await create();
    
    ctx.instance.show(1, 1);
    ctx.instance.hide();
    
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: true,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: no menu element: position is not calculated', async (t) => {
    const ctx = await create();
    
    ctx.element.querySelector = () => null;
    ctx.win.emit('contextmenu', {
        target: inside('menu'),
        clientX: 30,
        clientY: 40,
    });
    await tick();
    
    ctx.win.uninstall();
    
    t.match(ctx.element.innerHTML, 'left: 30px; top: 40px');
    t.end();
});

const createHooks = (overrides = {}) => {
    const calls = [];
    const hook = (name, value) => (...args) => {
        calls.push([name, ...args]);
        return value;
    };
    
    return {
        calls,
        hooks: {
            beforeShow: hook('beforeShow'),
            afterShow: hook('afterShow'),
            beforeHide: hook('beforeHide'),
            beforeClose: hook('beforeClose'),
            afterHide: hook('afterHide'),
            beforeClick: hook('beforeClick'),
            afterClick: hook('afterClick'),
            ...overrides,
        },
    };
};

test('lunes: hydrate: hooks: beforeShow and afterShow get the params', async (t) => {
    const {hooks, calls} = createHooks();
    const ctx = await create(hooks);
    
    ctx.instance.show(10, 20);
    ctx.win.uninstall();
    
    const params = {
        x: 10,
        y: 20,
        name: 'menu',
        position: {
            x: 10,
            y: 20,
        },
    };
    
    const expected = [
        ['beforeShow', params],
        ['afterShow', params],
    ];
    
    t.deepEqual(calls, expected);
    t.end();
});

test('lunes: hydrate: hooks: beforeShow returns false: the menu is not shown', async (t) => {
    const {hooks, calls} = createHooks({
        beforeShow: () => false,
    });
    
    const ctx = await create(hooks);
    
    ctx.instance.show(10, 20);
    ctx.win.uninstall();
    
    const expected = {
        html: '',
        calls: [],
    };
    
    t.deepEqual({
        html: ctx.element.innerHTML,
        calls: calls.map(([name]) => name),
    }, expected);
    t.end();
});

test('lunes: hydrate: hooks: beforeShow returns undefined: the menu is shown', async (t) => {
    const ctx = await create({
        beforeShow: noop,
    });
    
    ctx.instance.show(10, 20);
    ctx.win.uninstall();
    
    t.match(ctx.element.innerHTML, 'menu-item');
    t.end();
});

test('lunes: hydrate: hooks: contextmenu: beforeShow gets the pointer', async (t) => {
    const {hooks, calls} = createHooks();
    const ctx = await create(hooks);
    
    ctx.win.emit('contextmenu', {
        target: inside('menu'),
        clientX: 30,
        clientY: 40,
    });
    await tick();
    ctx.win.uninstall();
    
    t.deepEqual(calls[0], ['beforeShow', {
        x: 30,
        y: 40,
        name: 'menu',
        position: {
            x: 30,
            y: 40,
        },
    }]);
    t.end();
});

test('lunes: hydrate: hooks: contextmenu: beforeShow returns false', async (t) => {
    const ctx = await create({
        beforeShow: () => false,
    });
    
    ctx.win.emit('contextmenu', {
        target: inside('menu'),
        clientX: 30,
        clientY: 40,
    });
    await tick();
    ctx.win.uninstall();
    
    t.equal(ctx.element.innerHTML, '');
    t.end();
});

test('lunes: hydrate: hooks: hide: beforeHide, beforeClose, afterHide in order', async (t) => {
    const {hooks, calls} = createHooks();
    const ctx = await create(hooks);
    
    ctx.instance.show(1, 1);
    calls.length = 0;
    ctx.instance.hide();
    ctx.win.uninstall();
    
    const expected = [
        'beforeHide',
        'beforeClose',
        'afterHide',
    ];
    
    t.deepEqual(calls.map(([name]) => name), expected);
    t.end();
});

test('lunes: hydrate: hooks: hide: beforeClose returns true: the menu stays', async (t) => {
    const ctx = await create({
        beforeClose: () => true,
    });
    
    ctx.instance.show(1, 1);
    ctx.instance.hide();
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: false,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: hooks: hide while hidden: no hooks', async (t) => {
    const {hooks, calls} = createHooks();
    const ctx = await create(hooks);
    
    ctx.instance.hide();
    ctx.win.uninstall();
    const expected = [];
    
    t.deepEqual(calls, expected);
    t.end();
});

test('lunes: hydrate: hooks: click: beforeClick gets the name, the item is run after hide', async (t) => {
    const {hooks, calls} = createHooks();
    const ctx = await create(hooks, {
        edit: () => calls.push(['item']),
    });
    
    ctx.instance.show(1, 1);
    calls.length = 0;
    ctx.element.emit('click', {
        target: labelOf('edit'),
    });
    ctx.win.uninstall();
    
    const expected = [
        ['beforeClick', 'menu'],
        ['beforeHide'],
        ['beforeClose'],
        ['afterHide'],
        ['item'],
        ['afterClick'],
    ];
    
    t.deepEqual(calls, expected);
    t.end();
});

test('lunes: hydrate: hooks: click: beforeClick returns true: the item is not run, the menu hides', async (t) => {
    const ctx = await create({
        beforeClick: () => true,
    });
    
    ctx.instance.show(1, 1);
    ctx.element.emit('click', {
        target: labelOf('edit'),
    });
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: true,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: hooks: click: beforeClose returns true: the item is run, the menu stays', async (t) => {
    const ctx = await create({
        beforeClose: () => true,
    });
    
    ctx.instance.show(1, 1);
    ctx.element.emit('click', {
        target: labelOf('edit'),
    });
    ctx.win.uninstall();
    
    const expected = {
        fired: ['edit'],
        hidden: false,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: hooks: Enter goes through beforeClick', async (t) => {
    const ctx = await create({
        beforeClick: () => true,
    });
    
    ctx.instance.show(1, 1);
    await press(ctx, 'ArrowDown');
    await press(ctx, 'Enter');
    ctx.win.uninstall();
    
    const expected = {
        fired: [],
        hidden: true,
    };
    
    t.deepEqual(result(ctx), expected);
    t.end();
});

test('lunes: hydrate: hooks: Escape goes through the hide hooks', async (t) => {
    const {hooks, calls} = createHooks();
    const ctx = await create(hooks);
    
    ctx.instance.show(1, 1);
    calls.length = 0;
    await press(ctx, 'Escape');
    ctx.win.uninstall();
    
    const expected = [
        'beforeHide',
        'beforeClose',
        'afterHide',
    ];
    
    t.deepEqual(calls.map(([name]) => name), expected);
    t.end();
});

test('lunes: hydrate: hooks: click outside goes through the hide hooks', async (t) => {
    const {hooks, calls} = createHooks();
    const ctx = await create(hooks);
    
    ctx.instance.show(1, 1);
    calls.length = 0;
    ctx.win.emit('click', {
        target: {},
    });
    ctx.win.uninstall();
    
    const expected = [
        'beforeHide',
        'beforeClose',
        'afterHide',
    ];
    
    t.deepEqual(calls.map(([name]) => name), expected);
    t.end();
});

const inside = (name) => ({
    closest: (selector) => selector === `[data-name="${name}"]` ? {} : null,
});

test('lunes: hydrate: contextmenu outside of the element is ignored', async (t) => {
    const ctx = await create();
    const preventDefault = stub();
    
    ctx.win.emit('contextmenu', {
        clientX: 30,
        clientY: 40,
        target: inside('other'),
        preventDefault,
    });
    await tick();
    
    ctx.win.uninstall();
    
    const expected = ['', false];
    
    t.deepEqual([ctx.element.innerHTML, preventDefault.called], expected);
    t.end();
});

test('lunes: hydrate: contextmenu on the element shows the menu', async (t) => {
    const ctx = await create();
    
    ctx.win.emit('contextmenu', {
        clientX: 30,
        clientY: 40,
        target: inside('menu'),
    });
    await tick();
    
    ctx.win.uninstall();
    
    t.notOk(isHidden(ctx));
    t.end();
});

test('lunes: hydrate: hooks: beforeShow returns false: the shown menu hides without hide hooks', async (t) => {
    let allow = true;
    
    const {hooks, calls} = createHooks({
        beforeShow: () => allow,
    });
    
    const ctx = await create(hooks);
    
    ctx.instance.show(10, 20);
    allow = false;
    ctx.instance.show(30, 40);
    ctx.win.uninstall();
    
    const names = calls.map(([name]) => name);
    
    t.deepEqual([isHidden(ctx), names], [true, ['afterShow']]);
    t.end();
});

test('lunes: hydrate: show flips the menu by computed size near the edge', async (t) => {
    const ctx = await create({}, {}, {
        innerWidth: 120,
        innerHeight: 90,
        menuWidth: 100,
        menuHeight: 60,
    });
    
    ctx.instance.show(100, 80);
    
    const {innerHTML} = ctx.element;
    
    ctx.win.uninstall();
    
    t.match(innerHTML, 'left: 0px; top: 6px');
    t.end();
});
