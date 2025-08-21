export const key = 'F9';

export const listener = ({options}) => {
    options.beforeShow?.();
    return {
        command: 'show',
        position: {
            left: 0,
            top: 0,
        },
    };
};
