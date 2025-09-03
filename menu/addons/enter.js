import {run} from './run/index.js';

const isObject = (a) => a && typeof a === 'object';
const {values} = Object;

export const keys = ['Enter'];

export const filter = ({state}) => state.command === 'show';

export const stopPropagation = true;

export const listener = ({options, state}) => {
    run({
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

