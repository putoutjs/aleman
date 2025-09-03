import jessy from 'jessy';

export const createItemClick = (name) => ({
    name,
    events: ['click'],
    listener,
});

const listener = ({event, options}) => {
    const menuItemElement = document.elementFromPoint(event.clientX, event.clientY);
    const {menuPath} = menuItemElement.dataset;
    const {menu} = options;
    const fn = jessy(menuPath, menu);
    
    setTimeout(fn);
    options.beforeHide?.();
    
    return {
        index: -1,
        command: 'hide',
    };
};
