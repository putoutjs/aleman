import {operator} from 'putout';
import {checkDataName} from '../check-data-name.js';
import {getAttributePath} from '../jsx-operator.js';

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
        
        const openingElementPath = path.parentPath.parentPath.get('openingElement');
        
        if (!checkDataName(openingElementPath, name))
            return false;
        
        const attributePath = getAttributePath(path, 'className');
        
        if (!attributePath)
            return;
        
        if (attributePath.node.value.value.includes('menu-submenu-show'))
            push(attributePath);
    },
});
