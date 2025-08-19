export const events = [
    'contextmenu',
];

export const listener = ({event}) => ({
    position: {
        left: event.clientX,
        top: event.clientY - 14,
    },
});
