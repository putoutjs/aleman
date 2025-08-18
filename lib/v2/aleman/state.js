import fullstore from 'fullstore';

const {assign} = Object;
const {stringify, parse} = JSON;
const stateElement = document.getElementById('state');

const wrap = (rules, prev, {readState, writeState}) => () => {
    if (readStateStr() === prev())
        return;
    
    const state = readState(rules);
    prev(readStateStr());
    writeState(state);
    
    for (const rule of rules) {
        rule(state);
    }
};

export const createState = (state, rules) => {
    const prev = fullstore();
    const readState = createReadState(prev);
    const writeState = createWriteState(prev);
    
    const fn = wrap(rules, prev, {
        readState,
        writeState,
    });
    
    const observer = new MutationObserver(fn);
    const str = stringify(state, null, 4);
    
    history[str] = true;
    stateElement.textContent = str;
    
    document.addEventListener('keydown', ({key}) => {
        if (key === '`')
            fn();
    });
    
    observer.observe(stateElement, {
        attributes: true,
        childList: true,
        subtree: true,
    });
    
    return {
        readState,
        writeState,
    };
};

export const createReadState = (prev) => () => {
    const state = parse(stateElement.textContent);
    
    state.prev = prev;
    
    return state;
};

const readStateStr = () => stateElement.textContent;

export const createWriteState = (prev) => (newState) => {
    const prevStateStr = stateElement.textContent;
    const prevState = parse(stateElement.textContent);
    
    assign(prevState, newState);
    const str = stringify(prevState);
    
    if (str === prevStateStr)
        return;
    
    stateElement.textContent = str;
    setTimeout(() => {
        prev(str);
    });
};
