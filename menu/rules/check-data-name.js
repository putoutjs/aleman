export function checkDataName(path, dataName = 'menu') {
    const {attributes} = path.node;
    
    for (const {name, value} of attributes) {
        if (name.name === 'data-name')
            return value.value === dataName;
    }
    
    return false;
}
