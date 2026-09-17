const isObject = (a) => a && typeof a === 'object';
const {entries} = Object;

export const createState = (overrides = {}) => {
    const {
        menu = {},
        name = 'menu',
        infiniteScroll = false,
        show = true,
    } = overrides;
    return {
        name,
        infiniteScroll,
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show,
        x: 0,
        y: 20,
        items: createItems(menu),
    };
};

function createItems(menu, path = '') {
    const items = [];
    
    for (const [name, submenu] of entries(menu)) {
        const current = {
            name,
            path: !path ? name : `${path}.${name}`,
            selected: false,
        };
        
        if (isObject(submenu))
            current.submenu = {
                show: false,
                items: createItems(submenu, name),
            };
        
        items.push(current);
    }
    
    return items;
}
