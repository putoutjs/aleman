import {updateState} from '../state/state.js';

export const keys = [
    'ArrowLeft',
    'h',
];

export const preventDefault = true;

export const listener = ({state, options}) => updateState('left', state, options);
