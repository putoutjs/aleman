import {
    hideMenu,
    filter as menuFilter,
} from './menu.js';

export const events = ['click'];
export const filter = ({event, state}) => {
    if (!menuFilter({state}))
        return false;
    
    const {target} = event;
    
    return target.dataset.name !== 'menu-toggler';
};

export const listener = ({render, state}) => {
    hideMenu({
        render,
        state,
    });
};
