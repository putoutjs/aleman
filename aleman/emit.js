export const emit = (addon, {state, options, event, parseVim}) => {
    const [isEmitBefore, count] = emitBefore(addon, {
        event,
        parseVim,
    });
    
    if (!isEmitBefore)
        return state;
    
    if (!emitIf(addon, {state, event, options}))
        return state;
    
    if (addon.events && !addon.events.includes(event.type))
        return state;
    
    return emitRun(addon, {
        event,
        state,
        options,
        count,
    });
};
export const emitIf = (addon, {state, event, options}) => {
    if (!addon.filter)
        return true;
    
    return addon.filter({
        state,
        event,
        options,
    });
};

export const emitRun = (addon, {count, state, event, options}) => {
    return addon.listener({
        count,
        event,
        state,
        options,
    });
};

export const emitBefore = (addon, {event, parseVim}) => {
    const {keys, commands} = addon;
    
    if (keys && !keys.includes(event.key))
        return [false];
    
    const [command, count] = parseVim(event);
    
    if (commands && !commands.includes(command))
        return [false];
    
    return [true, count];
};
