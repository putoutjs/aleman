import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';

const {
    stringLiteral,
    jsxIdentifier,
    jsxAttribute,
} = types;

const {setLiteralValue} = operator;

export const report = () => `Set position`;

export const fix = ({path, attr, left, top}) => {
    const style = `left: ${left}px; top: ${top}px;`;
    
    if (attr) {
        setLiteralValue(attr.value, style);
        
        return;
    }
    
    const {attributes} = path.node;
    
    const attribute = jsxAttribute(jsxIdentifier('style'), stringLiteral(style));
    
    attributes.push(attribute);
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        const {name = 'menu', position = {}} = options;
        const {left = 0, top = 20} = position;
        
        if (!checkDataName(path.parentPath, name))
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
            return;
        }
        
        push({
            path,
            left,
            top,
        });
    },
});

function parsePosition(str) {
    const [x, y] = str
        .split(/;|left|\s|:|top|px/)
        .filter(Boolean);
    
    return [x, y];
}
