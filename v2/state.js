export const createStore = (initial) => {
    let state = {
        ...initial,
    };
    let listener = null;
    
    return {
        getState: () => state,
        setState: (patch) => {
            state = {
                ...state,
                ...patch,
            };
            
            listener?.(state);
        },
        subscribe: (fn) => {
            listener = fn;
        },
    };
};
