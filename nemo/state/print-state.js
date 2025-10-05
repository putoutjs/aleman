export const printState = (state) => {
    const {items} = state;
    const result = [];
    
    for (const {selected, name, submenu} of items) {
        const selectionMark = selected ? '+' : '-';
        const submenuMark = submenu ? '*' : '';
        
        const current = `${selectionMark}${name}${submenuMark}`;
        
        result.push(current);
    }
    
    return result.join('\n');
};
