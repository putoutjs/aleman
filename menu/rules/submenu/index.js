import {operator, types} from 'putout';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Select right`;

export const fix = ({path, prev, next, insideSubmenu}) => {
    const {value} = path.node;
    unselect(prev);
    unselect(next);
    
    if (!insideSubmenu) {
        const newValue = value.value.replace(/\s?menu-item-selected/, '');
        setLiteralValue(value, newValue);
        
        return;
    }
    
    const newValue = `${value.value} menu-item-selected`;
    setLiteralValue(value, newValue);
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        if (path.node.name.name !== 'li')
            return;
        
        const {insideSubmenu = true, submenuIndex = 1} = options;
        const parentMenu = path.parentPath.parentPath.parentPath;
        
        if (!isJSXElement(parentMenu))
            return;
        
        if (!isParentSelected(parentMenu))
            return;
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        if (!checkDataName(path.parentPath.parentPath))
            return;
        
        const children = path.parentPath
            .parentPath
            .get('children')
            .filter(isJSXElement);
        
        const prev = children[submenuIndex - 1];
        const current = children[submenuIndex];
        const next = children[submenuIndex + 1];
        
        if (!current)
            return;
        
        for (const attr of current.get('openingElement.attributes')) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            push({
                path: attr,
                insideSubmenu,
                prev,
                next,
            });
        }
    },
});

function checkDataName(path) {
    const attributes = path.get('openingElement.attributes');
    
    for (const attr of attributes) {
        const {name, value} = attr.node;
        
        if (name.name === 'data-name')
            return value.value === 'menu';
    }
    
    return false;
}

function isParentSelected(path) {
    const attributes = path.get('openingElement.attributes');
    
    for (const attr of attributes) {
        const {name, value} = attr.node;
        
        if (name.name === 'className')
            return value.value.includes('menu-item-selected');
    }
    
    return false;
}

function unselect(path) {
    if (!path)
        return;
    
    for (const attr of path.get('openingElement.attributes')) {
        const {name, value} = attr.node;
        
        if (name.name !== 'className')
            continue;
        
        if (value.value.includes('menu-item-selected'))
            setLiteralValue(value, value.value.replace(' menu-item-selected', ''));
    }
}
