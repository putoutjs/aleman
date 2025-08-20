import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = ({command}) => {
    const [first, ...rest] = command;
    
    return `${first.toUpperCase()}${rest.join('')} menu`;
};

export const fix = ({path, command}) => {
    const {value} = path.node;
    let newValue;
    
    if (command === 'show')
        newValue = value.value.replace(/\s?menu-hidden/, '');
    else
        newValue = value.value + ' menu-hidden';
    
    setLiteralValue(value, newValue);
};

export const traverse = ({push, options}) => ({
    JSXOpeningElement(path) {
        const {command} = options;
        const attributes = path.get('attributes');
        
        for (const attr of attributes) {
            const {name, value} = attr.node;
            
            if (name.name !== 'data-name')
                continue;
            
            if (value.value !== 'menu')
                return;
            
            break;
        }
        
        for (const attr of attributes) {
            const {name, value} = attr.node;
            
            if (name.name !== 'className')
                continue;
            
            if (command === 'show' && value.value.includes('menu-hidden'))
                push({
                    command: 'show',
                    path: attr,
                });
            
            if (command === 'hide' && !value.value.includes('menu-hidden'))
                push({
                    command,
                    path: attr,
                });
        }
    },
});
