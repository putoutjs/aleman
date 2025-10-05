import {operator} from 'putout';

const {
    getAttributeValue,
    hasTagName,
    removeClassName,
    containsClassName,
} = operator;

export const report = () => `Unselect wrongly selected`;

export const fix = (path) => {
    removeClassName(path, 'menu-item-selected');
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {index = 1, command} = options;
        
        if (command === 'hide')
            return;
        
        if (!hasTagName(path, 'li'))
            return;
        
        if (hasTagName(path.parentPath.parentPath, 'li'))
            return;
        
        if (!containsClassName(path, 'menu-item-selected'))
            return;
        
        const dataMenuIndex = Number(getAttributeValue(path, 'data-menu-index'));
        
        if (index === dataMenuIndex)
            return;
        
        push(path);
    },
});
