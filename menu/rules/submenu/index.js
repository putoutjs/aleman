import {operator, types} from 'putout';
import {
    getAttributePath,
    getAttributeValue,
    hasDataName,
    removeAttributeValue,
} from '../jsx-operator.js';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = ({insideSubmenu}) => `${insideSubmenu ? 'Show' : 'Hide'} submenu`;

export const fix = ({path, prev, next, insideSubmenu}) => {
    const {value} = path.node;
    unselect(prev);
    unselect(next);
    
    if (!insideSubmenu) {
        const newValue = value.value.replace(/\s?menu-item-selected/, '');
        setLiteralValue(value, newValue);
        
        return;
    }
    
    if (!value.value.includes('menu-item-selected')) {
        const newValue = `${value.value} menu-item-selected`;
        setLiteralValue(value, newValue);
    }
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        if (path.node.name.name !== 'li')
            return;
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        const {insideSubmenu = true, submenuIndex = 1} = options;
        const parentMenu = path.parentPath.parentPath.parentPath;
        
        if (!isJSXElement(parentMenu))
            return;
        
        if (!isParentSelected(parentMenu))
            return;
        
        const openingElementPath = path.parentPath.parentPath.get('openingElement');
        
        if (!hasDataName(openingElementPath))
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
        
        const currentOpeningElementPath = current.get('openingElement');
        const currentClassPath = getAttributePath(currentOpeningElementPath, 'className');
        
        push({
            path: currentClassPath,
            insideSubmenu,
            prev,
            next,
        });
    },
});

function isParentSelected(path) {
    const openingElement = path.get('openingElement');
    const classAttributeValue = getAttributeValue(openingElement, 'className');
    
    return classAttributeValue.includes('menu-item-selected');
}

function unselect(path) {
    if (!path)
        return;
    
    removeAttributeValue(path, 'className', 'menu-item-selected');
}
