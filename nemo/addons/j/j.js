import {updateState} from '../../state/state.js';

export const filter = ({state}) => state.show;
export const commands = ['j'];

export function listener({count, state, options}) {
    return updateState('down', state, {
        ...options,
        count,
    });
}
