import {operator, types} from 'putout';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Select right`;

export const fix = ({path, insideSubmenu}) => {
    const {value} = path.node;
    
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
        
        const {insideSubmenu = true, submenuIndex = 0} = options;
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
        
        const child = children[submenuIndex];
        
        for (const attr of child.get('openingElement.attributes')) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            if (insideSubmenu && !value.value.includes('menu-item-selected'))
                push({
                    path: attr,
                    insideSubmenu,
                });
            
            if (!insideSubmenu && value.value.includes('menu-item-selected'))
                push({
                    path: attr,
                    insideSubmenu,
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
