export const createMouseEnter = (name) => ({
    name,
    events: ['mouseenter'],
    listener: () => ({
        index: -1,
        showSubmenu: false,
        insideSubmenu: false,
        submenuIndex: 0,
    }),
});
