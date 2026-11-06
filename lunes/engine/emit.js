export const emitBefore = (addon, {event, parseVim}) => {
    const {keys, commands} = addon;
    
    if (keys && !keys.includes(event.key))
        return [false];
    
    const [command, count] = parseVim(event);
    
    if (commands && !commands.includes(command))
        return [false];
    
    return [true, count];
};
