import fullstore from 'fullstore';

const {assign} = Object;
const {stringify, parse} = JSON;

const wrap = (render, {prev, options, stateElement, readState, writeState}) => () => {
    const {textContent} = stateElement;
    
    if (stateElement.textContent === prev())
        return;
    
    const state = readState();
    prev(textContent);
    writeState(state);
    
    render({
        state,
        options,
    });
};

export const createState = (state, {options, listener, stateName = 'aleman-state'}) => {
    const stateElement = document.querySelector(`[data-name="${stateName}"]`);
    
    const prev = fullstore();
    const readState = createReadState(prev, stateElement);
    const writeState = createWriteState(prev, stateElement);
    
    const fn = wrap(listener, {
        options,
        prev,
        stateElement,
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

export const createReadState = (prev, stateElement) => () => {
    return parse(stateElement.textContent);
};

export const createWriteState = (prev, stateElement) => (newState) => {
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
