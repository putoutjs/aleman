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
    const {
        count = 1,
        infiniteScroll = state.infiniteScroll,
    } = options;
    
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
        
        if (command === 'reset') {
            reset(state);
            continue;
        }
        
        if (command === 'esc') {
            esc(state);
            continue;
        }
        
        if (command === 'gg') {
            gg(state);
            continue;
        }
        
        if (command === 'shift-g') {
            shiftG(state);
            continue;
        }
        
        if (command === 'right') {
            right(state);
            continue;
        }
        
        if (command === 'left') {
            left(state);
            continue;
        }
    }
    
    return state;
};

function right(state) {
    const {items, index} = state;
    const current = items[index];
    
    if (!current?.submenu)
        return state;
    
    current.submenu.show = true;
    state.submenuIndex = 0;
    state.insideSubmenu = true;
    
    return state;
}

function left(state) {
    const {items, index} = state;
    const current = items[index];
    
    if (current?.submenu)
        current.submenu.show = false;
    
    state.submenuIndex = -1;
    state.insideSubmenu = false;
    
    return state;
}

function reset(state) {
    closeSubmenus(state.items);
    state.index = -1;
    state.submenuIndex = -1;
    state.insideSubmenu = false;
    
    return state;
}

function esc(state) {
    for (const item of state.items) {
        item.selected = false;
        
        if (item.submenu)
            item.submenu.show = false;
    }
    
    state.index = -1;
    state.submenuIndex = -1;
    state.insideSubmenu = false;
    state.command = 'hide';
    state.show = false;
    
    return state;
}

function closeSubmenus(items) {
    for (const item of items) {
        item.selected = false;
        
        if (!item.submenu)
            continue;
        
        item.submenu.show = false;
        closeSubmenus(item.submenu.items);
    }
}

const gg = (state) => edge(state, 0);

function shiftG(state) {
    return edge(state, state.items.length - 1);
}

function edge(state, index) {
    const {items} = state;
    
    closeSubmenus(items);
    
    state.index = index;
    state.submenuIndex = -1;
    state.insideSubmenu = false;
    
    const current = items[index];
    
    if (current)
        current.selected = true;
    
    return state;
}

function moveSubmenu(state, step, {infiniteScroll}) {
    const submenu = state.items[state.index]?.submenu;
    if (!submenu?.items.length)
        return state;
    
    const {items} = submenu;
    const last = items.length - 1;
    let index = state.submenuIndex + step;
    
    if (index > last)
        index = infiniteScroll ? 0 : last;
    else if (index < 0)
        index = infiniteScroll ? last : 0;
    
    for (const [i, item] of items.entries())
        item.selected = i === index;
    
    state.submenuIndex = index;
    return state;
}

function down(state, {infiniteScroll}) {
    if (state.insideSubmenu)
        return moveSubmenu(state, 1, {infiniteScroll});
    
    let {index, items} = state;
    const current = items[index];
    const lastIndex = items.length - 1;
    
    if (index === -1) {
        const [first] = items;
        ++index;
        first.selected = true;
    } else if (index < lastIndex) {
        current.selected = false;
        ++index;
        const next = items[index];
        
        next.selected = true;
    } else if (infiniteScroll) {
        // already at last item -> wrap to first
        current.selected = false;
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
