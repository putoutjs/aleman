import {operator} from 'putout';

const {
    hasTagName,
    removeClassName,
    hasDataName,
    containsClassName,
} = operator;

const CLASS = 'menu-submenu-show';

export const report = () => `Hide submenu`;

export const fix = (path) => {
    removeClassName(path, CLASS);
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {name = 'menu', showSubmenu} = options;
        const {parentPath} = path;
        
        if (showSubmenu)
            return;
        
        if (!hasTagName(path, 'li'))
            return;
        
        if (!hasDataName(parentPath, name))
            return false;
        
        if (containsClassName(path, CLASS))
            push(path);
    },
});

