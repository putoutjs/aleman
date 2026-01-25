import {updateState} from '../../state/state.js';

export const keys = ['ArrowDown'];
export const preventDefault = true;

export const listener = ({state, options}) => {
    return updateState('down', state, options);
};
