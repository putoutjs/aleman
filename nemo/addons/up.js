import {getSubmenu} from './submenu/index.js';
import {updateState} from '../state/state.js';

export const keys = ['ArrowUp'];

export const preventDefault = true;

export const listener = ({state, options}) => {
    return updateState('up', state, options);
};
