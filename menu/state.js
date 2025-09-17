export const initState = ({name = 'menu'}) => ({
    name,
    command: 'hide',
    insideSubmenu: false,
    submenuIndex: 0,
    showSubmenu: false,
    index: -1,
    position: {
        x: 0,
        y: 20,
    },
});
