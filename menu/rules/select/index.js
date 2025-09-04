import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';
import {
    appendAttributeValue,
    getAttributePath,
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
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        const openingElementPath = path.parentPath.parentPath.get('openingElement');
        
        if (!checkDataName(openingElementPath, name))
            return;
        
        const children = path.parentPath
            .parentPath
            .get('children')
            .filter(isJSXElement);
        
        const prev = children[index - 1];
        const current = children[index];
        const next = children[index + 1];
        
        if (!current)
            return;
        
        const currentOpeningElement = current.get('openingElement');
        const attributePath = getAttributePath(currentOpeningElement, 'className');
        
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
    
    removeAttributeValue(path, 'className', 'menu-submenu-show');
}

function removeShowSubmenu(path) {
    removeAttributeValue(path, 'className', 'menu-submenu-show');
}
