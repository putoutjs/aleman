import {run} from './run/index.js';
import * as right from './right.js';

export const keys = ['Enter'];

export const filter = ({state}) => state.command === 'show';

export const stopPropagation = true;
export const preventDefault = true;

export const listener = ({options, state}) => {
    const [result] = run({
        options,
        state,
    });
    
    if (!result)
        return right.listener({
            options,
            state,
        });
    
    options.beforeHide?.(state);
    
    return {
        command: 'hide',
        index: -1,
        insideSubmenu: false,
    };
};
