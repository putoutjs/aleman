import {
    hasTagName,
    containsClassName,
    removeClassName,
    hasDataName,
} from '../jsx-operator.js';

const CLASS = 'menu-submenu-show';

export const report = () => `Hide submenu`;

export const fix = (path) => {
    removeClassName(path, CLASS);
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {name, showSubmenu} = options;
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
