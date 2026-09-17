// pure functions only — no framework imports, no DOM, no side effects
// every command takes state, returns the next state (state in -> state out)
export const commands = {
    down,
    up,
    left,
    right,
    gg,
    'shift-g': shiftG,
    reset,
    esc,
    show,
    hide,
};

function edge(state, index) {
    closeSubmenus(state.items);
    
    state.index = index;
    state.submenuIndex = -1;
    state.insideSubmenu = false;
    
    const current = state.items[index];
    
    if (current)
        current.selected = true;
    
    return state;
}

function gg(state) {
    return edge(state, 0);
}

function shiftG(state) {
    return edge(state, state.items.length - 1);
}

function down(state, {infiniteScroll = state.infiniteScroll} = {}) {
    if (state.insideSubmenu)
        return moveSubmenu(state, 1, {
            infiniteScroll,
        });
    
    let {index, items} = state;
    const current = items[index];
    const lastIndex = items.length - 1;
    
    if (index === -1) {
        const [first] = items;
        
        if (!first)
            return state;
        
        ++index;
        first.selected = true;
    } else if (index < lastIndex) {
        current.selected = false;
        ++index;
        items[index].selected = true;
    } else if (infiniteScroll) {
        current.selected = false;
        index = 0;
        items[index].selected = true;
    }
    
    state.index = index;
    
    return state;
}

function up(state, {infiniteScroll = state.infiniteScroll} = {}) {
    let {index, items} = state;
    
    if (index > 0) {
        const current = items[index];
        
        current.selected = false;
        
        if (current.submenu)
            current.submenu.show = false;
        
        --index;
        items[index].selected = true;
        state.index = index;
        
        return state;
    }
    
    if (!index && infiniteScroll) {
        items[index].selected = false;
        index = items.length - 1;
        items[index].selected = true;
        state.index = index;
    }
    
    return state;
}

function right(state) {
    const current = state.items[state.index];
    
    if (!current?.submenu)
        return state;
    
    current.submenu.show = true;
    state.submenuIndex = 0;
    state.insideSubmenu = true;
    
    return state;
}

function left(state) {
    const current = state.items[state.index];
    
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
    reset(state);
    
    state.command = 'hide';
    state.show = false;
    
    return state;
}

function show(state) {
    state.command = 'show';
    state.show = true;
    
    return state;
}

function hide(state) {
    return esc(state);
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

function closeSubmenus(items) {
    for (const item of items) {
        item.selected = false;
        
        if (!item.submenu)
            continue;
        
        item.submenu.show = false;
        item.selected = false;
        
        closeSubmenus(item.submenu.items);
    }
}
