export const events = [
    'contextmenu',
];

export const preventDefault = true;

export const listener = ({event, options}) => {
    options.beforeShow?.();
    return {
        command: 'show',
        position: {
            left: event.clientX,
            top: event.clientY - 14,
        },
    };
};
