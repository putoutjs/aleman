import {updateState} from '../../state/state.js';

export const createMouseEnter = (name) => ({
    name,
    events: ['mouseleave'],
    listener: ({state}) => updateState('reset', state),
});
