const queryElement = ({name}) => {
    if (!name)
        return document;
    
    return document.querySelector(`[data-name="${name}"]`);
};

const maybeEvents = ({events}) => {
    if (events)
        return events;
    
    return ['keydown'];
};

export const addListeners = ({addons, readState, writeState}) => {
    for (const addon of addons) {
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
                });
                
                writeState(newState);
            });
        }
    }
};
