export function getMenuPath(event) {
    let menuItemElement = document.elementFromPoint(event.clientX, event.clientY);
    const {menuPath} = menuItemElement.dataset;
    
    if (!menuPath)
        menuItemElement = menuItemElement.querySelector('[data-menu-path]');
    
    if (!menuPath)
        return '';
    
    return menuItemElement.dataset.menuPath;
}

