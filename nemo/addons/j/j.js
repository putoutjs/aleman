import {updateState} from '../../state/state.js';

export const filter = ({state}) => state.show;
export const commands = ['j'];

export function listener({count, state}) {
    return updateState('down', state, {
        count,
    });
}
