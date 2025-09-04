import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = () => `Hide submenu`;

export const fix = (path) => {
    const {value} = path.node;
    const newValue = value.value;
    
    setLiteralValue(value, newValue
        .replace('menu-submenu-show', '')
        .trim());
};

export const traverse = ({push, options}) => ({
    JSXOpeningElement(path) {
        const {name, showSubmenu} = options;
        
        if (path.node.name.name !== 'li')
            return;
        
        if (showSubmenu)
            return;
        
        const attributes = path.get('attributes');
        const openingElementPath = path.parentPath.parentPath.get('openingElement');
        
        if (!checkDataName(openingElementPath, name))
            return false;
        
        for (const attr of attributes) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            if (value.value.includes('menu-submenu-show'))
                push(attr);
        }
    },
});

function checkDataName(path, dataName = 'menu') {
    const {attributes} = path.node;
    
    for (const {name, value} of attributes) {
        if (name.name === 'data-name')
            return value.value === dataName;
    }
    
    return false;
}
