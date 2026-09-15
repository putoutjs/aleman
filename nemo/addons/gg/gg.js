import {updateState} from '../../state/state.js';

export const commands = [
    'gg',
    '^',
];

export const listener = ({state, options}) => updateState('gg', state, options);
