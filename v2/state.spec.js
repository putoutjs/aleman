import {test} from 'supertape';
import {createStore} from './state.js';

const noop = () => {};

test('v2: state: getState: initial', (t) => {
    const store = createStore({
        a: 1,
    });
    const state = store.getState();
    
    t.equal(state.a, 1);
    t.end();
});

test('v2: state: getState: stable reference', (t) => {
    const store = createStore({
        a: 1,
    });
    const first = store.getState();
    const second = store.getState();
    
    t.equal(first, second);
    t.end();
});

test('v2: state: createStore: copies initial', (t) => {
    const initial = {
        a: 1,
    };
    const store = createStore(initial);
    
    initial.a = 2;
    const state = store.getState();
    
    t.equal(state.a, 1);
    t.end();
});

test('v2: state: setState: merges', (t) => {
    const store = createStore({
        a: 1,
    });
    
    store.setState({
        b: 2,
    });
    const result = store.getState();
    const expected = {
        a: 1,
        b: 2,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: state: setState: overrides', (t) => {
    const store = createStore({
        a: 1,
    });
    
    store.setState({
        a: 3,
    });
    const state = store.getState();
    
    t.equal(state.a, 3);
    t.end();
});

test('v2: state: setState: creates new reference', (t) => {
    const store = createStore({
        a: 1,
    });
    const before = store.getState();
    
    store.setState({
        b: 2,
    });
    const after = store.getState();
    
    t.notEqual(after, before);
    t.end();
});

test('v2: state: setState: no subscriber', (t) => {
    const store = createStore({
        a: 1,
    });
    
    store.setState({
        b: 2,
    });
    const result = store.getState();
    const expected = {
        a: 1,
        b: 2,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: state: subscribe: called on setState', (t) => {
    const store = createStore({
        a: 1,
    });
    const states = [];
    
    store.subscribe((state) => {
        states.push(state);
    });
    
    store.setState({
        b: 2,
    });
    
    t.equal(states.length, 1);
    t.end();
});

test('v2: state: subscribe: receives merged state', (t) => {
    const store = createStore({
        a: 1,
    });
    const states = [];
    
    store.subscribe((state) => {
        states.push(state);
    });
    
    store.setState({
        b: 2,
    });
    const result = states;
    const expected = [{
        a: 1,
        b: 2,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: state: subscribe: latest listener wins', (t) => {
    const store = createStore({
        a: 1,
    });
    const first = [];
    
    store.subscribe((state) => {
        first.push(state);
    });
    
    store.subscribe(noop);
    
    store.setState({
        b: 2,
    });
    const result = first;
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: state: subscribe: replacement is called', (t) => {
    const store = createStore({
        a: 1,
    });
    const second = [];
    
    store.subscribe(noop);
    store.subscribe((state) => {
        second.push(state);
    });
    
    store.setState({
        b: 2,
    });
    const result = second;
    const expected = [{
        a: 1,
        b: 2,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
