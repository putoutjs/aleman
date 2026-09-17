import css from '../menu/menu.css';
import {createMenu as createSourceMenu} from '../menu/menu.js';

export const createMenu = (elementName, options, menu) => {
    if (!document.querySelector('[data-name="aleman-menu-style"]')) {
        const style = document.createElement('style');
        style.dataset.name = 'aleman-menu-style';
        style.textContent = css;
        document.head.append(style);
    }
    
    return createSourceMenu(elementName, options, menu);
};
