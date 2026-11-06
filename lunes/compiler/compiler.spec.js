import {stub, test} from 'supertape';
import {createCompiler} from './compiler.js';

const create = (overrides = {}) => {
    const element = {};
    
    const commit = stub().returns('state');
    const render = stub().returns('<ul></ul>');
    
    const compile = createCompiler(element, {
        commit,
        render,
        ...overrides,
    });
    
    return {
        element,
        commit,
        render,
        compile,
    };
};

test('lunes: compiler: renders the state into the element', (t) => {
    const {compile, element} = create();
    
    compile('next');
    
    t.equal(element.innerHTML, '<ul></ul>');
    t.end();
});

test('lunes: compiler: passes the options to commit', (t) => {
    const {compile, commit} = create();
    
    compile('next', {
        count: 2,
    });
    
    const args = ['next', {
        count: 2,
    }];
    
    t.calledWith(commit, args);
    t.end();
});

test('lunes: compiler: keeps the position of the last show', (t) => {
    const {compile, render} = create();
    
    compile('show', {
        position: {
            top: 20,
            left: 10,
        },
    });
    compile('next', {
        position: {},
    });
    
    const [, [, options]] = render.args;
    
    t.deepEqual(options.position, {
        top: 20,
        left: 10,
    });
    t.end();
});

test('lunes: compiler: default position', (t) => {
    const {compile, render} = create();
    
    compile('next');
    
    const [, options] = render.args[0];
    
    t.deepEqual(options.position, {
        top: 0,
        left: 0,
    });
    t.end();
});

test('lunes: compiler: show with an event: opens at the pointer', (t) => {
    const {compile, render} = create();
    
    compile('show', {
        position: {},
        event: {
            clientX: 400,
            clientY: 300,
        },
    });
    
    const [, options] = render.args[0];
    
    t.deepEqual(options.position, {
        top: 300,
        left: 400,
    });
    t.end();
});

test('lunes: compiler: show with an event: moves the menu to the calculated position', (t) => {
    const getPosition = stub().returns({
        top: 286,
        left: 400,
    });
    
    const {compile, render} = create({
        getPosition,
    });
    
    compile('show', {
        position: {},
        event: {
            clientX: 400,
            clientY: 300,
        },
    });
    
    const [, [, options]] = render.args;
    
    t.deepEqual(options.position, {
        top: 286,
        left: 400,
    });
    t.end();
});

test('lunes: compiler: show with an event: next show keeps the calculated position for other operations', (t) => {
    const {compile, render} = create({
        getPosition: stub().returns({
            top: 286,
            left: 400,
        }),
    });
    
    compile('show', {
        position: {},
        event: {
            clientX: 400,
            clientY: 300,
        },
    });
    compile('next', {
        position: {},
    });
    
    const [, options] = render.args.at(-1);
    
    t.deepEqual(options.position, {
        top: 286,
        left: 400,
    });
    t.end();
});

test('lunes: compiler: show with an event without coordinates: default position', (t) => {
    const {compile, render} = create();
    
    compile('show', {
        event: {
            type: 'keydown',
        },
    });
    
    const [, options] = render.args.at(-1);
    
    t.deepEqual(options.position, {
        top: 0,
        left: 0,
    });
    t.end();
});

test('lunes: compiler: show with an event: the calculated position is the same: renders once', (t) => {
    const {compile, render} = create({
        getPosition: () => ({
            top: 5,
            left: 7,
        }),
    });
    
    compile('show', {
        event: {
            clientX: 7,
            clientY: 5,
        },
    });
    
    t.calledCount(render, 1);
    t.end();
});
