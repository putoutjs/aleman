export const key = 'Escape';

export const listener = ({options}) => {
    options.beforeHide?.();
    return {
        command: 'hide',
        index: -1,
    };
};
