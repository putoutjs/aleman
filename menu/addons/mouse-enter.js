export const createMouseEnter = (name) => ({
    name,
    events: ['mouseenter'],
    listener: () => ({
        index: -1,
    }),
});
