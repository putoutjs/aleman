import {stub, test} from 'supertape';
import {createCompiler} from './compiler.js';

const create = (overrides = {}) => {
    const element = {};
    
    const commit = stub().returns('state');
    const render = stub().returns('<ul></ul>');
    const run = stub().returns(true);
    const read = stub().returns('current');
    
    const compile = createCompiler(element, {
        commit,
        render,
        run,
        read,
        ...overrides,
    });
    
    return {
        element,
        commit,
        render,
        run,
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

test('lunes: compiler: run: calls the callback, then hides', (t) => {
    const {compile, commit} = create();
    
    compile('run');
    
    const args = ['hide', {}];
    
    t.calledWith(commit, args);
    t.end();
});

test('lunes: compiler: run: no callback: no commit', (t) => {
    const {compile, commit} = create({
        run: stub().returns(false),
    });
    
    compile('run');
    
    t.notCalled(commit);
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
