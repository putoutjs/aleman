import {updateState} from '../state/state.js';

export const keys = [
    'ArrowRight',
    'l',
];

export const preventDefault = true;

export const listener = ({state, options}) => updateState('right', state, options);
