import {operator, types} from 'putout';
import {
    getAttributeValue,
    hasDataName,
    removeClassName,
} from '../jsx-operator.js';

const {hasTagName} = operator;

const {isJSXElement} = types;

export const report = () => `Unselect all`;

export const fix = ({path}) => {
    removeClassName(path, 'menu-item-selected');
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {index, name} = options;
        
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
            const classNameValue = getAttributeValue(child, 'className');
            
            if (classNameValue.includes('menu-item-selected'))
                push({
                    path: child,
                });
        }
    },
});
