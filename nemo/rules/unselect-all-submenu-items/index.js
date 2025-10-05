import {operator, types} from 'putout';

const {isJSXElement} = types;
const {
    hasTagName,
    removeClassName,
} = operator;

export const report = () => `Unselect all submenu items`;

export const fix = (path) => {
    removeClassName(path, 'menu-item-selected');
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {showSubmenu} = options;
        
        if (showSubmenu)
            return;
        
        if (!hasTagName(path, 'li'))
            return;
        
        if (!isJSXElement(path.parentPath.parentPath.parentPath))
            return;
        
        push(path);
    },
});
