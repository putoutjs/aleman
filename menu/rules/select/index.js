import {operator, types} from 'putout';
import {
    appendAttributeValue,
    getAttributePath,
    hasDataName,
    removeAttributeValue,
} from '../jsx-operator.js';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Select item`;

export const fix = ({path, current, prev, next, showSubmenu}) => {
    const {value} = path.node;
    
    if (!value.value.includes('menu-item-selected'))
        setLiteralValue(value, `${value.value} menu-item-selected`);
    
    addShowSubmenu(current, {
        showSubmenu,
    });
    
    unselect(prev);
    unselect(next);
    removeShowSubmenu(next);
    removeShowSubmenu(prev);
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        const {
            name = 'menu',
            index = 1,
            showSubmenu,
        } = options;
        
        if (path.node.name.name !== 'li')
            return;
        
        const parentParentPath = path.parentPath.parentPath;
        
        if (!isJSXElement(parentParentPath))
            return;
        
        if (!hasDataName(parentParentPath, name))
            return;
        
        const children = parentParentPath.get('children').filter(isJSXElement);
        
        const prev = children[index - 1];
        const current = children[index];
        const next = children[index + 1];
        
        if (!current)
            return;
        
        const attributePath = getAttributePath(current, 'className');
        
        push({
            path: attributePath,
            current,
            prev,
            next,
            showSubmenu,
        });
    },
});

function unselect(path) {
    removeAttributeValue(path, 'className', 'menu-item-selected');
}

function addShowSubmenu(path, {showSubmenu}) {
    if (showSubmenu)
        return appendAttributeValue(path, 'className', 'menu-submenu-show');
}

function removeShowSubmenu(path) {
    removeAttributeValue(path, 'className', 'menu-submenu-show');
}
