import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';

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
        
        const {insideSubmenu = true, submenuIndex = 1} = options;
        const parentMenu = path.parentPath.parentPath.parentPath;
        
        if (!isJSXElement(parentMenu))
            return;
        
        if (!isParentSelected(parentMenu))
            return;
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        const openingElementPath = path.parentPath.parentPath.get('openingElement');
        
        if (!checkDataName(openingElementPath))
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
        
        const [currentClassPath] = getClassPath(current);
        
        push({
            path: currentClassPath,
            insideSubmenu,
            prev,
            next,
        });
    },
});

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

function getClassPath(path) {
    if (!path)
        return [null, ''];
    
    for (const attr of path.get('openingElement.attributes')) {
        const {name, value} = attr.node;
        
        if (name.name !== 'className')
            continue;
        
        return [
            attr,
            value.value,
        ];
    }
}
