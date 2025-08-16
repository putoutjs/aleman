import {operator} from 'putout';
import {checkDataName} from '../check-data-name.js';

const {setLiteralValue} = operator;

export const report = () => `Set position`;

export const fix = ({attr, left, top}) => {
    const style = `left: ${left}px; top: ${top}px;`;
    setLiteralValue(attr.value, style);
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        const {left = 0, top = 20} = options;
        
        if (!checkDataName(path.parentPath, 'menu'))
            return;
        
        for (const attr of path.node.attributes) {
            if (attr.name.name !== 'style')
                continue;
            
            const [x, y] = parsePosition(attr.value.value);
            
            if (x === left && y === top)
                return;
            
            push({
                path,
                attr,
                left,
                top,
            });
        }
    },
});

function parsePosition(str) {
    const [x, y] = str
        .split(/;|left|\s|:|top|px/)
        .filter(Boolean);
    
    return [x, y];
}
