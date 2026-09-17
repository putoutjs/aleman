import {runByIndex} from './item-click.js';

export const keys = ['Enter'];

export const filter = ({state}) => {
    if (state.insideSubmenu)
        return true;
    
    const current = state.items[state.index];
    
    return current && !current.submenu;
};

export const command = 'enter';

// Enter = "click" the selected item via the keyboard
export const enter = ({state, options}) => runByIndex(state, options);
