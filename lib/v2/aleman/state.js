const {assign} = Object;
const {stringify, parse} = JSON;
const stateElement = document.getElementById('state');

let PrevState = '';

const wrap = (rules) => () => {
    if (readStateStr() === PrevState)
        return;
    
    const state = readState();
    
    PrevState = readStateStr();
    writeState(state);
    
    for (const rule of rules) {
        rule(state);
    }
};

export const initState = (state, rules) => {
    const fn = wrap(rules);
    const observer = new MutationObserver(fn);
    const str = stringify(state, null, 4);
    
    history[str] = true;
    stateElement.textContent = str;
    
    document.addEventListener('keydown', ({key}) => {
        if (key === 'Escape')
            fn();
    });
    
    observer.observe(stateElement, {
        attributes: true,
        childList: true,
        subtree: true,
    });
};

export const readState = () => {
    return parse(readStateStr());
};

const readStateStr = () => stateElement.textContent;

export const writeState = (newState) => {
    const prevStateStr = stateElement.textContent;
    const prevState = parse(stateElement.textContent);
    
    assign(prevState, newState);
    const str = stringify(prevState);
    
    if (str === prevStateStr)
        return;
    
    stateElement.textContent = str;
    setTimeout(() => {
        PrevState = str;
    });
};
