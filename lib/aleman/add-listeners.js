const queryElement = (name) => {
    if (!name)
        return document;
    
    return document.querySelector(`[data-name="${name}"]`);
};

export const addListeners = ({addons, readState, writeState}) => {
    for (const {name, listener, events, preventDefault} of addons) {
        const element = queryElement(name);
        
        for (const event of events) {
            element.addEventListener(event, (event) => {
                if (preventDefault)
                    event.preventDefault();
                
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
