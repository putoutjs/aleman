export function checkDataName(path, dataName = 'menu') {
    const attributes = path.get('openingElement.attributes');
    
    for (const attr of attributes) {
        const {name, value} = attr.node;
        
        if (name.name === 'data-name')
            return value.value === dataName;
    }
    
    return false;
}
