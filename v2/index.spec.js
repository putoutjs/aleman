import {test} from 'supertape';
import {operator} from 'putout';
import {createComponent} from './index.js';

const {
    addClassName,
    removeClassName,
    containsClassName,
} = operator;

const createVisibilityRule = () => ({
    report: () => 'Toggle visibility',
    fix: ({path, show}) => {
        if (show) {
            removeClassName(path, 'menu-hidden');
            return;
        }
        
        addClassName(path, 'menu-hidden');
    },
    traverse: ({options, push}) => ({
        JSXElement(path) {
            const shown = !containsClassName(path, 'menu-hidden');
            const {show = false} = options;
            
            if (show === shown)
                return;
            
            push({
                path,
                show,
            });
        },
    }),
});

const template = '<ul data-name="menu" class="menu menu-hidden"></ul>';

const createHTML = () => ({
    _html: '',
    addEventListener() {},
    querySelector: () => null,
    get innerHTML() {
        return this._html;
    },
    set innerHTML(value) {
        this._html = value;
    },
});

const createTarget = () => {
    const listeners = {};
    
    return {
        addEventListener: (event, fn) => {
            listeners[event] = listeners[event] || [];
            listeners[event].push(fn);
        },
        dispatch: (event, type = 'keydown') => {
            for (const listener of listeners[type] || [])
                listener(event);
        },
    };
};

const showCommand = (current) => ({
    ...current,
    show: true,
});

const hideCommand = (current) => ({
    ...current,
    show: false,
});

const config = {
    template,
    rules: {
        'toggle-visibility': createVisibilityRule(),
    },
    commands: {
        show: showCommand,
        hide: hideCommand,
    },
};

const createComponentWith = (state, overrides = {}) => {
    const element = createHTML();
    const component = createComponent(element, {
        ...config,
        state,
        ...overrides,
    });
    
    return {
        element,
        component,
    };
};

test('v2: createComponent: initial render: hidden', (t) => {
    const {element} = createComponentWith({
        show: false,
    });
    const result = element.innerHTML.includes('menu-hidden');
    
    t.ok(result);
    t.end();
});

test('v2: createComponent: initial render: visible', (t) => {
    const {element} = createComponentWith({
        show: true,
    });
    const result = element.innerHTML.includes('menu-hidden');
    
    t.notOk(result);
    t.end();
});

test('v2: createComponent: setState rerenders', (t) => {
    const {element, component} = createComponentWith({
        show: false,
    });
    
    component.setState({
        show: true,
    });
    const result = element.innerHTML.includes('menu-hidden');
    
    t.notOk(result);
    t.end();
});

test('v2: createComponent: show: renders visible', (t) => {
    const {element, component} = createComponentWith({
        show: false,
    });
    
    component.show(10, 20);
    const result = element.innerHTML.includes('menu-hidden');
    
    t.notOk(result);
    t.end();
});

test('v2: createComponent: show: sets show', (t) => {
    const {component} = createComponentWith({
        show: false,
    });
    
    component.show(10, 20);
    const state = component.getState();
    
    t.ok(state.show);
    t.end();
});

test('v2: createComponent: hide: renders hidden', (t) => {
    const {element, component} = createComponentWith({
        show: true,
    });
    
    component.hide();
    const result = element.innerHTML.includes('menu-hidden');
    
    t.ok(result);
    t.end();
});

test('v2: createComponent: hide: sets show false', (t) => {
    const {component} = createComponentWith({
        show: true,
    });
    
    component.hide();
    const state = component.getState();
    
    t.notOk(state.show);
    t.end();
});

test('v2: createComponent: show: sets x', (t) => {
    const {component} = createComponentWith({
        show: false,
    });
    
    component.show(10, 20);
    const state = component.getState();
    
    t.equal(state.x, 10);
    t.end();
});

test('v2: createComponent: show: sets y', (t) => {
    const {component} = createComponentWith({
        show: false,
    });
    
    component.show(10, 20);
    const state = component.getState();
    
    t.equal(state.y, 20);
    t.end();
});

test('v2: createComponent: subscribe', (t) => {
    const {component} = createComponentWith({
        show: false,
    });
    const states = [];
    
    component.subscribe((state) => {
        states.push(state.show);
    });
    
    component.setState({
        show: true,
    });
    const result = states;
    const expected = [true];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: createComponent: addons: keydown runs command', (t) => {
    const document = createTarget();
    const {component} = createComponentWith({show: false}, {
        addons: [{
            keys: ['F9'],
            command: 'show',
        }],
        document,
    });
    
    document.dispatch({
        key: 'F9',
    });
    const state = component.getState();
    
    t.ok(state.show);
    t.end();
});

test('v2: createComponent: addons: other key ignored', (t) => {
    const document = createTarget();
    const {component} = createComponentWith({show: false}, {
        addons: [{
            keys: ['F9'],
            command: 'show',
        }],
        document,
    });
    
    document.dispatch({
        key: 'x',
    });
    const state = component.getState();
    
    t.notOk(state.show);
    t.end();
});
