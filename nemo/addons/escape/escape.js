import {updateState} from '../../state/state.js';

export const keys = ['Escape'];

export const listener = ({state, options}) => updateState('esc', state, options);
