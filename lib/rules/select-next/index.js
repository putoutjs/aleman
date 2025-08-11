import {operator, types} from 'putout';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export const report = () => `Select next item`;

export const fix = ({path, next}) => {
    const {value} = path.node;
    const newValue = value.value.replace(/\s?menu-item-selected/, '');
    
    setLiteralValue(value, newValue);
    
    for (const {name, value} of next.node.openingElement.attributes) {
        if (name.name !== 'className')
            continue;
        
        setLiteralValue(value, `${value.value} menu-item-selected`);
    }
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        if (path.node.name.name !== 'li')
            return;
        
        const {index = 1} = options;
        
        const attributes = path.parentPath.parentPath.get('openingElement.attributes');
        
        for (const attr of attributes) {
            const {name, value} = attr.node;
            
            if (name.name !== 'data-name')
                continue;
            
            if (value.value !== 'menu')
                return;
            
            break;
        }
        
        const children = path.parentPath
            .parentPath
            .get('children')
            .filter(isJSXElement);
        
        if (index !== children.indexOf(path.parentPath) + 1)
            return;
        
        const next = children[index];
        
        if (!next)
            return;
        
        for (const attr of path.get('attributes')) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            if (value.value.includes('menu-item-selected'))
                push({
                    path: attr,
                    next,
                });
        }
    },
});
