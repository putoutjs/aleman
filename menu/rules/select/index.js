import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Select item`;

export const fix = ({path, prev, next}) => {
    const {value} = path.node;
    setLiteralValue(value, `${value.value} menu-item-selected`);
    
    unselect(prev);
    unselect(next);
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        const {name = 'menu', index = 1} = options;
        
        if (path.node.name.name !== 'li')
            return;
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        const openingElementPath = path.parentPath.parentPath.get('openingElement');
        
        if (!checkDataName(openingElementPath, name))
            return;
        
        const children = path.parentPath
            .parentPath
            .get('children')
            .filter(isJSXElement);
        
        const prev = children[index - 1];
        const current = children[index];
        const next = children[index + 1];
        
        if (!current)
            return;
        
        for (const attr of current.get('openingElement.attributes')) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            if (!value.value.includes('menu-item-selected')) {
                push({
                    path: attr,
                    prev,
                    next,
                });
                break;
            }
        }
    },
});

function unselect(path) {
    if (!path)
        return;
    
    for (const attr of path.get('openingElement.attributes')) {
        const {name, value} = attr.node;
        
        if (name.name !== 'className')
            continue;
        
        if (value.value.includes('menu-item-selected'))
            setLiteralValue(value, value.value.replace(' menu-item-selected', ''));
    }
}
