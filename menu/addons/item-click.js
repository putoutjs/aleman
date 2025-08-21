export const name = 'menu';
export const events = ['click'];

export const listener = ({event, options}) => {
    const menuItemElement = document.elementFromPoint(event.clientX, event.clientY);
    const name = menuItemElement.textContent.trim();
    const {menu} = options;
    const fn = menu[name];
    
    setTimeout(fn);
    options.beforeClose?.();
    
    return {
        index: -1,
        command: 'hide',
    };
};
