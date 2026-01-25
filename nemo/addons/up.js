import {updateState} from '../state/state.js';

export const keys = ['ArrowUp'];

export const preventDefault = true;

export const listener = ({state, options}) => updateState('up', state, options);
