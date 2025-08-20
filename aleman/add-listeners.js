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
        const {
            key,
            listener,
            preventDefault,
        } = addon;
        
        for (const event of events) {
            element.addEventListener(event, (event) => {
                if (preventDefault)
                    event.preventDefault();
                
                if (key && event.key !== key)
                    return;
                
                const state = readState();
                
                const newState = listener({
                    event,
                    state,
                    options,
                });
                
                writeState(newState);
            });
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
        const {
            key,
            listener,
            preventDefault,
        } = addon;
        
        for (const event of events) {
            document.addEventListener(event, (event) => {
                if (preventDefault)
                    event.preventDefault();
                
                if (key && event.key !== key)
                    return;
                
                const state = readState();
                
                const newState = listener({
                    event,
                    state,
                    options,
                });
                
                writeState(newState);
            });
        }
    }
};
