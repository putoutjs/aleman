import {operator, types} from 'putout';
import {checkDataName} from '../check-data-name.js';

const {
    stringLiteral,
    jsxIdentifier,
    jsxAttribute,
} = types;

const {setLiteralValue} = operator;

export const report = () => `Set position`;

export const fix = ({path, attr, x, y}) => {
    const style = `left: ${x}px; top: ${y}px;`;
    
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
        const {x = 0, y = 20} = position;
        
        const openingElementPath = path.parentPath.get('openingElement');
        
        if (!checkDataName(openingElementPath, name))
            return;
        
        for (const attr of path.node.attributes) {
            if (attr.name.name !== 'style')
                continue;
            
            const [x1, y1] = parsePosition(attr.value.value);
            
            if (x === x1 && y === y1)
                return;
            
            push({
                path,
                attr,
                x,
                y,
            });
            return;
        }
        
        push({
            path,
            x,
            y,
        });
    },
});

function parsePosition(str) {
    const [x, y] = str
        .split(/;|left|\s|:|top|px/)
        .filter(Boolean);
    
    return [x, y];
}
