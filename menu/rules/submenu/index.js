import {operator, types} from 'putout';
import {
    addAttributeValue,
    addClassName,
    getAttributeValue,
    hasDataName,
    removeAttributeValue,
    removeClassName,
} from '../jsx-operator.js';

const {hasTagName} = operator;

const {isJSXElement} = types;

export const report = ({insideSubmenu}) => `${insideSubmenu ? 'Show' : 'Hide'} submenu`;

export const fix = ({path, prev, next, insideSubmenu}) => {
    unselect(prev);
    unselect(next);
    
    if (!insideSubmenu) {
        removeClassName(path, 'menu-item-selected');
        return;
    }
    
    addClassName(path, 'menu-item-selected');
};

export const traverse = ({options, push}) => ({
    JSXElement(path) {
        if (!hasTagName(path, 'li'))
            return;
        
        if (!isJSXElement(path.parentPath))
            return;
        
        const {insideSubmenu = true, submenuIndex = 1} = options;
        const parentMenu = path.parentPath.parentPath.parentPath;
        
        if (!isJSXElement(parentMenu))
            return;
        
        if (!isParentSelected(path.parentPath.parentPath))
            return;
        
        if (!hasDataName(path.parentPath))
            return;
        
        const children = path.parentPath
            .get('children')
            .filter(isJSXElement);
        
        const prev = children[submenuIndex - 1];
        const current = children[submenuIndex];
        const next = children[submenuIndex + 1];
        
        if (!current)
            return;
        
        push({
            path: current,
            insideSubmenu,
            prev,
            next,
        });
    },
});

function isParentSelected(path) {
    const classAttributeValue = getAttributeValue(path, 'className');
    return classAttributeValue.includes('menu-item-selected');
}

function unselect(path) {
    if (!path)
        return;
    
    removeAttributeValue(path, 'className', 'menu-item-selected');
}
