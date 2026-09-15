import {updateState} from '../../state/state.js';

export const commands = ['k'];

export const listener = ({count, state, options}) => updateState('up', state, {
    ...options,
    count,
});
