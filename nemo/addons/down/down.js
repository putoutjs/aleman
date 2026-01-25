import {updateState} from '../../state/state.js';

export const keys = ['ArrowDown'];
export const preventDefault = true;

export const listener = ({state, options}) => updateState('down', state, options);
