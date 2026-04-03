import {getSubmenu} from './submenu/index.js';

export const keys = [
    'ArrowLeft',
    'h',
];
export const preventDefault = true;

export const filter = ({state, options}) => {
    return state.command === 'show';
};

export const listener = () => ({
    submenuIndex: -1,
    insideSubmenu: false,
    showSubmenu: false,
});
