export const key = 'Escape';

export const listener = ({state, options}) => {
    options.beforeHide?.(state);
    return {
        command: 'hide',
        index: -1,
    };
};
