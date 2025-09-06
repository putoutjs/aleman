import {checkDataName} from '../check-data-name.js';
import {
    appendAttributeValue,
    getAttributeValue,
    removeAttributeValue,
} from '../jsx-operator.js';

export const report = ({command}) => {
    const [first, ...rest] = command;
    
    return `${first.toUpperCase()}${rest.join('')} menu`;
};

export const fix = ({path, command}) => {
    if (command === 'show') {
        removeAttributeValue(path, 'className', 'menu-hidden');
        return;
    }
    
    appendAttributeValue(path, 'className', 'menu-hidden');
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {name, command} = options;
        const classNameValue = getAttributeValue(path, 'className');
        
        if (!checkDataName(path, name))
            return false;
        
        const hidden = command === 'show' && classNameValue.includes('menu-hidden');
        const shown = command === 'hide' && !classNameValue.includes('menu-hidden');
        
        if (hidden || shown)
            push({
                command,
                path,
            });
    },
});
