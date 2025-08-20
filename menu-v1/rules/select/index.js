import {operator, types} from 'putout';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Select item`;

export const fix = (path) => {
    const {value} = path.node;
    setLiteralValue(value, `${value.value} menu-item-selected`);
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        if (path.node.name.name !== 'li')
            return;
        
        const {index = 1} = options;
        
        if (!isJSXElement(path.parentPath.parentPath))
            return;
        
        if (!checkDataName(path.parentPath.parentPath))
            return;
        
        const children = path.parentPath
            .parentPath
            .get('children')
            .filter(isJSXElement);
        
        const next = children[index];
        
        if (!next)
            return;
        
        for (const attr of next.get('openingElement.attributes')) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            if (!value.value.includes('menu-item-selected')) {
                push(attr);
                break;
            }
        }
    },
});

function checkDataName(path) {
    const attributes = path.get('openingElement.attributes');
    
    for (const attr of attributes) {
        const {name, value} = attr.node;
        
        if (name.name === 'data-name')
            return value.value === 'menu';
    }
    
    return false;
}
