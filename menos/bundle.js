import css from '../nemo/menu.css';
import {createMenu as createSourceMenu} from './menos.js';

export const createMenu = (elementName, options = {}, menu = options.menu) => {
    if (!document.querySelector('[data-name="aleman-menos-style"]')) {
        const style = document.createElement('style');
        style.dataset.name = 'aleman-menos-style';
        style.textContent = css;
        document.head.append(style);
    }
    
    return createSourceMenu(elementName, {...options, menu});
};
