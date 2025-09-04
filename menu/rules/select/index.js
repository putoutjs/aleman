import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';

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
        
        for (const attr of current.get('openingElement.attributes')) {
            const {name} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            push({
                path: attr,
                current,
                prev,
                next,
                showSubmenu,
            });
            break;
        }
    },
});

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

function addShowSubmenu(path, {showSubmenu}) {
    for (const attr of path.get('openingElement.attributes')) {
        const {name, value} = attr.node;
        
        if (name.name !== 'className')
            continue;
        
        const currentValue = value.value;
        
        if (showSubmenu && !currentValue.includes('menu-submenu-show')) {
            setLiteralValue(value, `${currentValue} menu-submenu-show`);
            break;
        }
        
        if (!showSubmenu && currentValue.includes('menu-submenu-show')) {
            setLiteralValue(value, currentValue.replace('menu-submenu-show', ''));
            break;
        }
    }
}

function removeShowSubmenu(path) {
    if (!path)
        return;
    
    for (const attr of path.get('openingElement.attributes')) {
        const {name, value} = attr.node;
        
        if (name.name !== 'className')
            continue;
        
        const currentValue = value.value;
        
        if (currentValue.includes('menu-submenu-show')) {
            setLiteralValue(value, currentValue.replace(' menu-submenu-show', ''));
            break;
        }
    }
}
