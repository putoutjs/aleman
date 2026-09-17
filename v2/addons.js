export const wireAddons = (addons, {store, commands, options, vim, element, document = globalThis.document}) => {
    for (const addon of addons) {
        const handler = createHandler(addon, {
            store,
            commands,
            options,
            vim,
        });
        
        if (addon.name) {
            element.querySelector(`[data-name="${addon.name}"]`)?.addEventListener(addon.event || 'keydown', handler);
            
            continue;
        }
        
        document.addEventListener(addon.event || 'keydown', handler);
    }
};

const createHandler = (addon, {store, commands, options, vim}) => (event) => {
    if (addon.keys && !addon.keys.includes(event.key))
        return;
    
    if (addon.vim) {
        const [vimCommand] = vim(event);
        
        if (vimCommand !== addon.vim)
            return;
    }
    
    if (addon.filter && !addon.filter({state: store.getState(), event, options}))
        return;
    
    const state = store.getState();
    const command = commands[addon.command];
    
    if (!command)
        return;
    
    store.setState(command(state, options));
};
