import {test} from 'supertape';
import {createStore} from './state.js';

test('v2: store: getState: returns state', (t) => {
    const store = createStore({
        index: 0,
    });
    
    const result = store.getState();
    
    const expected = {
        index: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: store: getState: does not return the initial object', (t) => {
    const initial = {
        index: 0,
    };
    
    const store = createStore(initial);
    
    const result = store.getState() === initial;
    
    t.notOk(result);
    t.end();
});

test('v2: store: getState: keeps reference between reads', (t) => {
    const store = createStore({
        index: 0,
    });
    
    const first = store.getState();
    const second = store.getState();
    const result = first === second;
    
    t.ok(result);
    t.end();
});

test('v2: store: setState: merges patch', (t) => {
    const store = createStore({
        index: 0,
        show: true,
    });
    
    store.setState({
        index: 1,
    });
    
    const result = store.getState();
    
    const expected = {
        index: 1,
        show: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: store: setState: overrides value', (t) => {
    const store = createStore({
        show: true,
    });
    
    store.setState({
        show: false,
    });
    
    const result = store.getState().show;
    
    t.notOk(result);
    t.end();
});

test('v2: store: setState: returns new reference', (t) => {
    const store = createStore({
        show: true,
    });
    
    const previous = store.getState();
    
    store.setState({
        show: false,
    });
    
    const result = store.getState() === previous;
    
    t.notOk(result);
    t.end();
});

test('v2: store: setState: does not mutate previous state', (t) => {
    const store = createStore({
        show: true,
    });
    
    const previous = store.getState();
    
    store.setState({
        show: false,
    });
    
    const result = previous.show;
    
    t.ok(result);
    t.end();
});

test('v2: store: setState: no listener', (t) => {
    const store = createStore({
        show: true,
    });
    
    const result = store.setState({
        show: false,
    });
    
    t.notOk(result);
    t.end();
});

test('v2: store: setState: calls listener', (t) => {
    const store = createStore({
        show: true,
    });
    
    const states = [];
    
    store.subscribe((state) => {
        states.push(state.show);
    });
    store.setState({
        show: false,
    });
    
    const result = states;
    const expected = [false];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: store: setState: listener gets merged state', (t) => {
    const store = createStore({
        index: 0,
        show: true,
    });
    
    const states = [];
    
    store.subscribe((state) => {
        states.push(state);
    });
    store.setState({
        index: 1,
    });
    
    const [result] = states;
    
    const expected = {
        index: 1,
        show: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: store: subscribe: latest listener wins', (t) => {
    const store = createStore({
        show: true,
    });
    
    const first = [];
    const second = [];
    
    store.subscribe((state) => {
        first.push(state.show);
    });
    store.subscribe((state) => {
        second.push(state.show);
    });
    store.setState({
        show: false,
    });
    
    const result = [first, second];
    
    const expected = [
        [],
        [false],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: store: subscribe: replaces listener', (t) => {
    const store = createStore({
        show: true,
    });
    
    const states = [];
    
    const listener = (state) => {
        states.push(state.show);
    };
    
    store.subscribe(listener);
    store.subscribe(listener);
    store.setState({
        show: false,
    });
    
    const result = states;
    const expected = [false];
    
    t.deepEqual(result, expected);
    t.end();
});
