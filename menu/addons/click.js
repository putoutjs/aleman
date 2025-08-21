export const events = ['click'];

export const listener = ({options}) => {
    options.beforeClick?.();
    return {
        command: 'hide',
        index: -1,
    };
};
