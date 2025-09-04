export const keys = ['Escape'];

export const listener = ({state, options}) => {
    options.beforeHide?.(state);
    return {
        command: 'hide',
        showSubmenu: false,
        index: -1,
    };
};
