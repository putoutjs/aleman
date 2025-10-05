export const printState = ({items}) => {
    const result = [];
    
    for (const {selected, name, submenu} of items) {
        const selectionMark = selected ? '+' : '-';
        const submenuMark = submenu ? submenu.show ? '>' : '*' : '';
        
        const current = `${selectionMark}${name}${submenuMark}`;
        
        result.push(current);
    }
    
    return result.join('\n');
};
