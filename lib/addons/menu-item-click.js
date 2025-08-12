import {menu} from '../menu/menu.js';
import {hideMenu} from '../globals/menu.js';

export const name = 'menu';
export const events = ['click'];
export const listener = ({event, render, element, state}) => {
    const index = element.index ?? -1;
    
    const menuItemElement = document.elementFromPoint(event.clientX, event.clientY);
    const name = menuItemElement.textContent.trim();
    const fn = menu[name];
    
    fn();
    
    hideMenu({
        render,
        state,
    });
    
    render('unselect', {
        index: index - 1,
    });
    
    render('select', {
        index,
    });
};
