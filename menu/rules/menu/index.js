import {
    addClassName,
    containsClassName,
    hasDataName,
    removeClassName,
} from '../jsx-operator.js';

export const report = ({command}) => {
    const [first, ...rest] = command;
    
    return `${first.toUpperCase()}${rest.join('')} menu`;
};

export const fix = ({path, command}) => {
    if (command === 'show') {
        removeClassName(path, 'menu-hidden');
        return;
    }
    
    addClassName(path, 'menu-hidden');
};

export const traverse = ({push, options}) => ({
    JSXElement(path) {
        const {name, command} = options;
        
        if (!hasDataName(path, name))
            return false;
        
        const shown = !containsClassName(path, 'menu-hidden');
        
        if (command === 'show' && !shown || command === 'hide' && shown)
            push({
                command,
                path,
            });
    },
});
