import {menu} from '../menu/menu.js';

export const name = 'menu-toggler';
export const events = ['click'];
export const listener = ({render, element, state}) => {
    const command = element.command === 'show' ? 'hide' : 'show';
    
    render(['build-menu', 'menu'], {
        command,
        menu,
    });
};
