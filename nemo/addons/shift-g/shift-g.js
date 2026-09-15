import {updateState} from '../../state/state.js';

export const keys = [
    'G',
    '$',
];

export const filter = ({state}) => state.command === 'show';

export const preventDefault = true;

export const listener = ({state, options}) => updateState('shift-g', state, options);
