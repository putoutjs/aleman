import {getSubmenu} from './submenu/index.js';

export const keys = [
    'ArrowRight',
    'l',
];
export const preventDefault = true;

export const filter = ({state, options}) => {
    const {index} = state;
    const submenu = getSubmenu({
        index,
        options,
    });
    
    return Object.keys(submenu).length;
};

export const listener = () => ({
    submenuIndex: 0,
    insideSubmenu: true,
});
