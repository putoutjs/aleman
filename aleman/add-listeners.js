const queryElement = ({name}) => {
    return document.querySelector(`[data-name="${name}"]`);
};

const maybeEvents = ({events}) => {
    if (events)
        return events;
    
    return ['keydown'];
};

export const addListeners = ({namedAddons, options, readState, writeState}) => {
    for (const addon of namedAddons) {
        const element = queryElement(addon);
        const events = maybeEvents(addon);
        
        for (const event of events) {
            element.addEventListener(event, createListener({
                addon,
                options,
                readState,
                writeState,
            }));
        }
    }
};

const hasName = ({name}) => name;

export const splitAddons = (addons) => {
    const globalAddons = [];
    const namedAddons = [];
    
    for (const addon of addons) {
        if (hasName(addon)) {
            namedAddons.push(addon);
            continue;
        }
        
        globalAddons.push(addon);
    }
    
    return {
        globalAddons,
        namedAddons,
    };
};

export const addGlobalListeners = ({globalAddons, options, readState, writeState}) => {
    for (const addon of globalAddons) {
        const events = maybeEvents(addon);
        
        for (const event of events) {
            document.addEventListener(event, createListener({
                addon,
                options,
                readState,
                writeState,
            }));
        }
    }
};

const createListener = ({options, addon, readState, writeState}) => (event) => {
    const {
        key,
        listener,
        preventDefault,
        stopPropagation,
        filter,
        after,
        afterIf,
    } = addon;
    
    if (key && event.key !== key)
        return;
    
    const state = readState();
    
    const is = filter?.({
        event,
        state,
        options,
    });
    
    if (filter && !is)
        return false;
    
    if (preventDefault)
        event.preventDefault();
    
    if (stopPropagation)
        event.stopPropagation();
    
    const newState = listener({
        event,
        state,
        options,
        writeState,
    });
    
    writeState(newState);
    
    const isAfterIf = !afterIf || afterIf({
        state: newState,
        options,
    });
    
    if (after && isAfterIf)
        requestAnimationFrame(() => {
            writeState(after({
                event,
                state: newState,
                options,
            }));
        });
};
