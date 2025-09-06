import {checkDataName} from '../check-data-name.js';
import {
    checkTagName,
    containsClass,
    removeClass,
} from '../jsx-operator.js';

const CLASS = 'menu-submenu-show';

export const report = () => `Hide submenu`;

export const fix = (path) => {
    removeClass(path, CLASS);
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {name, showSubmenu} = options;
        const {parentPath} = path;
        
        if (showSubmenu)
            return;
        
        if (!checkTagName(path, 'li'))
            return;
        
        if (!checkDataName(parentPath, name))
            return false;
        
        if (containsClass(path, CLASS))
            push(path);
    },
});
