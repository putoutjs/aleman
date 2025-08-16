import {showMenu} from '../menu/menu.js';

export const events = [
    'contextmenu',
];

export const listener = ({render, state, event}) => {
    event.preventDefault();
    showMenu({
        render,
        state,
    });
    
    render('set-position', {
        left: event.clientX,
        top: event.clientY - 14,
    });
};
