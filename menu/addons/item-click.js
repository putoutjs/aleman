import jessy from 'jessy';

export const createItemClick = (name) => ({
    name,
    events: ['click'],
    listener,
});

const listener = ({event, options}) => {
    const {menu} = options;
    const menuPath = getMenuPath(event);
    const fn = jessy(menuPath, menu);
    
    setTimeout(fn);
    options.beforeHide?.();
    
    return {
        index: -1,
        command: 'hide',
        showSubmenu: false,
    };
};

function getMenuPath(event) {
    let menuItemElement = document.elementFromPoint(event.clientX, event.clientY);
    const {menuPath} = menuItemElement.dataset;
    
    if (!menuPath)
        menuItemElement = menuItemElement.querySelector('[data-menu-path]');
    
    return menuItemElement.dataset.menuPath;
}

