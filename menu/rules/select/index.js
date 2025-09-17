import {operator, types} from 'putout';

const {isJSXElement} = types;
const {
    hasTagName,
    addClassName,
    removeClassName,
    hasAttributeValue,
    containsClassName,
} = operator;

const SELECTED = 'menu-item-selected';
const SHOW = 'menu-submenu-show';

export const report = () => `Select item`;

export const fix = ({path, prev, next, showSubmenu}) => {
    addClassName(path, SELECTED);
    addShowSubmenu(path, {
        showSubmenu,
    });
    unselect(prev);
    unselect(next);
    
    removeShowSubmenu(next);
    removeShowSubmenu(prev);
};

export const traverse = ({options, push}) => ({
    JSXElement(path) {
        const {index = 1, showSubmenu} = options;
        
        if (!hasTagName(path, 'li'))
            return;
        
        if (!hasAttributeValue(path, 'data-menu-index', String(index)))
            return;
        
        if (containsClassName(path, 'menu-item-selected'))
            return;
        
        const {parentPath} = path;
        const children = parentPath.get('children').filter(isJSXElement);
        
        const prev = children[index - 1];
        const current = children[index];
        const next = children[index + 1];
        
        push({
            path: current,
            prev,
            next,
            showSubmenu,
        });
    },
});

function unselect(path) {
    removeClassName(path, SELECTED);
}

function addShowSubmenu(path, {showSubmenu}) {
    if (showSubmenu)
        return addClassName(path, SHOW);
}

function removeShowSubmenu(path) {
    removeClassName(path, SHOW);
}
