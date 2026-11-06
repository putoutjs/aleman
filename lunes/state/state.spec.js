import {test} from 'supertape';
import {createState, isShown} from './state.js';
import {getCursorPath} from './getter/getter.js';

const noop = () => {};

const menu = {
    view: noop,
    edit: noop,
    rename: noop,
    new: {
        file: noop,
        directory: noop,
    },
};

test('lunes: state: isShown', (t) => {
    const result = isShown(`['on', {view}];`);
    
    t.ok(result);
    t.end();
});

test('lunes: state: isShown: off', (t) => {
    const result = isShown(`['off', 'no-cursor', {view}];`);
    
    t.notOk(result);
    t.end();
});

test('lunes: state: commit: hidden menu ignores navigation', (t) => {
    const {commit, read} = createState(menu);
    
    commit('next');
    const result = read();
    const expected = read();
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: next with count', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('next');
    commit('next', {
        count: 2,
    });
    
    const result = getCursorPath(read());
    const expected = 'rename';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: next with count: no cursor: counts from the first item', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('next', {
        count: 2,
    });
    
    const result = getCursorPath(read());
    const expected = 'edit';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: prev with count: no cursor: counts from the last item', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('prev', {
        count: 2,
    });
    
    const result = getCursorPath(read());
    const expected = 'rename';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: next with count 1: no cursor: puts the cursor on the first item', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('next', {
        count: 1,
    });
    
    const result = getCursorPath(read());
    const expected = 'view';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: next stays on the last item', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('last');
    commit('next');
    
    const result = getCursorPath(read());
    const expected = 'new';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: next wraps with infiniteScroll', (t) => {
    const {commit, read} = createState(menu, {
        infiniteScroll: true,
    });
    
    commit('show');
    commit('last');
    commit('next');
    
    const result = getCursorPath(read());
    const expected = 'view';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: right enters the submenu, left leaves it', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('last');
    commit('right');
    
    const inside = getCursorPath(read());
    
    commit('left');
    
    const result = [inside, getCursorPath(read())];
    const expected = [
        'new.file',
        'new',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: state: commit: hide drops the cursor', (t) => {
    const {
        commit,
        read,
        isShown,
    } = createState(menu);
    
    commit('show');
    commit('next');
    commit('hide');
    
    const result = [
        isShown(),
        getCursorPath(read()),
    ];
    
    const expected = [false, ''];
    
    t.deepEqual(result, expected);
    t.end();
});

const deepMenu = {
    a: noop,
    b: {
        c: noop,
        d: {
            e: noop,
            f: noop,
        },
    },
};

test('lunes: state: commit: three levels: left leaves one level at a time', (t) => {
    const {commit, read} = createState(deepMenu);
    
    commit('show');
    commit('last');
    commit('right');
    commit('next');
    commit('right');
    commit('next');
    
    const deepest = getCursorPath(read());
    
    commit('left');
    
    const middle = getCursorPath(read());
    
    commit('left');
    
    const result = [deepest, middle, getCursorPath(read())];
    const expected = [
        'b.d.f',
        'b.d',
        'b',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: state: commit: three levels: right enters one level at a time', (t) => {
    const {commit, read} = createState({
        a: {
            b: {
                c: noop,
            },
        },
    });
    
    commit('show');
    commit('next');
    commit('right');
    
    const result = getCursorPath(read());
    const expected = 'a.b';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: prev', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('next');
    commit('prev');
    
    const result = getCursorPath(read());
    const expected = 'view';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: prev: infiniteScroll wraps to the last item', (t) => {
    const {commit, read} = createState(menu, {
        infiniteScroll: true,
    });
    
    commit('show');
    commit('prev');
    
    const result = getCursorPath(read());
    const expected = 'new';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: first and last', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('last');
    
    const last = getCursorPath(read());
    
    commit('first');
    
    const first = getCursorPath(read());
    const result = [first, last];
    
    const expected = [
        'view',
        'new',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: state: commit: reset removes the cursor', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('next');
    commit('reset');
    
    const result = getCursorPath(read());
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: prev stays on the first item', (t) => {
    const {commit, read} = createState(menu);
    
    commit('show');
    commit('first');
    commit('prev');
    
    const result = getCursorPath(read());
    const expected = 'view';
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: commit: prev from the first item wraps with infiniteScroll', (t) => {
    const {commit, read} = createState(menu, {
        infiniteScroll: true,
    });
    
    commit('show');
    commit('first');
    commit('prev');
    
    const result = getCursorPath(read());
    const expected = 'new';
    
    t.equal(result, expected);
    t.end();
});

const labeled = {
    'Upload To Cloud': noop,
    '(Un)Select All': noop,
    'New Items': {
        'File Name': noop,
    },
};

test('lunes: state: labels with spaces: cursor walks and returns', (t) => {
    const {commit} = createState(labeled);
    
    commit('show');
    const first = getCursorPath(commit('next'));
    const second = getCursorPath(commit('next'));
    const third = getCursorPath(commit('next'));
    const back = getCursorPath(commit('prev'));
    const result = [
        first,
        second,
        third,
        back,
    ];
    const expected = [
        'Upload To Cloud',
        '(Un)Select All',
        'New Items',
        '(Un)Select All',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: state: labels with spaces: submenu is entered', (t) => {
    const {commit} = createState(labeled);
    
    commit('show');
    commit('last');
    commit('right');
    
    const result = getCursorPath(commit('next'));
    
    t.equal(result, 'New Items.File Name');
    t.end();
});
