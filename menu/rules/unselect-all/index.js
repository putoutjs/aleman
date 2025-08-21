import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Unselect all`;

export const fix = ({path}) => {
    const {value} = path.node;
    const newValue = value.value.replace(/\s?menu-item-selected/, '');
    
    setLiteralValue(value, newValue);
};

export const traverse = ({push, options}) => ({
    JSXOpeningElement(path) {
        const {index} = options;
        
        if (index !== -1)
            return;
        
        if (path.node.name.name !== 'li')
            return;
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        if (!checkDataName(path.parentPath.parentPath, name))
            return;
        
        const children = path.parentPath
            .parentPath
            .get('children')
            .filter(isJSXElement);
        
        for (const child of children) {
            for (const attr of child.get('openingElement.attributes')) {
                const {name, value} = attr.node;
                
                if (name.name !== 'className')
                    continue;
                
                if (value.value.includes('menu-item-selected'))
                    push({
                        path: attr,
                    });
            }
        }
    },
});
