const isObject = (a) => a && typeof a === 'object';
const {entries} = Object;

export const createState = ({name = 'menu', menu = {}}) => {
    const items = createMenuItems(menu);
    const result = {
        name,
        infiniteScroll: false,
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        position: {
            x: 0,
            y: 20,
        },
        items,
    };
    
    return result;
};

function createMenuItems(menu, path = '') {
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
                items: createMenuItems(submenu, name),
            };
        
        items.push(current);
    }
    
    return items;
}

export const updateState = (command, state, options = {}) => {
    const {count = 1, infiniteScroll = state.infiniteScroll} = options;
    
    for (let i = 0; i < count; i++) {
        if (command === 'down') {
            down(state, {
                infiniteScroll,
            });
            continue;
        }
        
        if (command === 'up') {
            up(state, {
                infiniteScroll,
            });
            continue;
        }
    }
    
    return state;
};

function down(state, {infiniteScroll}) {
    let {index, items} = state;
    const current = items[index];
    
    if (index === -1) {
        const [first] = items;
        ++index;
        first.selected = true;
    } else if (index < items.length - 1) {
        current.selected = false;
        ++index;
        const next = items[index];
        
        next.selected = true;
        
        if (next.submenu)
            next.submenu.show = true;
    }
    
    if (infiniteScroll && index === items.length - 1) {
        items[index].selected = false;
        index = 0;
        items[index].selected = true;
    }
    
    state.index = index;
    
    return state;
}

function up(state, {infiniteScroll}) {
    let {index, items} = state;
    const current = items[index];
    
    if (index > 0) {
        current.selected = false;
        
        if (current.submenu)
            current.submenu.show = false;
        
        --index;
        items[index].selected = true;
        
        state.index = index;
        return state;
    }
    
    if (infiniteScroll) {
        items[index].selected = false;
        index = items.length - 1;
        items[index].selected = true;
        
        state.index = index;
    }
    
    return state;
}
