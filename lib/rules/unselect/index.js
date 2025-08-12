import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Select next item`;

export const fix = ({path}) => {
    const {value} = path.node;
    const newValue = value.value.replace(/\s?menu-item-selected/, '');
    
    setLiteralValue(value, newValue);
};

export const traverse = ({push}) => ({
    JSXOpeningElement(path) {
        if (path.node.name.name !== 'li')
            return;
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        if (!checkDataName(path.parentPath.parentPath))
            return;
        
        for (const attr of path.get('attributes')) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            if (value.value.includes('menu-item-selected'))
                push({
                    path: attr,
                });
        }
    },
});
