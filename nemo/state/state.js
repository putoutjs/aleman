const isObject = (a) => a && typeof a === 'object';
const {entries} = Object;

export const createState = ({name = 'menu', menu = {}}) => {
    const items = createMenuItems(menu);
    const result = {
        name,
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

export const updateState = (command, state, {count = 1} = {}) => {
    for (let i = 0; i < count; i++) {
        if (command === 'down') {
            down(state);
            continue;
        }
        
        if (command === 'up') {
            up(state);
            continue;
        }
    }
    
    return state;
};

function down(state) {
    let {index, items} = state;
    
    if (index === -1) {
        const [first] = items;
        ++index;
        first.selected = true;
    } else if (index < items.length - 1) {
        items[index].selected = false;
        ++index;
        items[index].selected = true;
    }
    
    state.index = index;
    
    return state;
}

function up(state) {
    let {index, items} = state;
    
    if (index > 0) {
        items[index].selected = false;
        --index;
        items[index].selected = true;
    }
    
    return state;
}
