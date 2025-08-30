export const createItemClick = (name) => ({
    name,
    events: ['click'],
    listener,
});

const listener = ({event, options}) => {
    const menuItemElement = document.elementFromPoint(event.clientX, event.clientY);
    const name = menuItemElement.textContent.trim();
    const {menu} = options;
    const fn = menu[name];
    
    setTimeout(fn);
    options.beforeHide?.();
    
    return {
        index: -1,
        command: 'hide',
    };
};
