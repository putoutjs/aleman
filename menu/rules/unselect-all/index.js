import {operator, types} from 'putout';

const {
    hasTagName,
    removeClassName,
    hasDataName,
    containsClassName,
} = operator;

const {isJSXElement} = types;
const SELECTED = 'menu-item-selected';

export const report = () => `Unselect all`;

export const fix = ({path}) => {
    removeClassName(path, SELECTED);
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {index, name = 'menu'} = options;
        
        if (index !== -1)
            return;
        
        if (!hasTagName(path, 'li'))
            return;
        
        if (!isJSXElement(path.parentPath))
            return;
        
        if (!hasDataName(path.parentPath, name))
            return;
        
        const children = path.parentPath
            .get('children')
            .filter(isJSXElement);
        
        for (const child of children) {
            if (containsClassName(child, SELECTED))
                push({
                    path: child,
                });
        }
    },
});

