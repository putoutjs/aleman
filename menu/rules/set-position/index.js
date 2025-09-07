import {types} from 'putout';
import {
    getAttributePath,
    getAttributeValue,
    hasDataName,
    setAttributeValue,
} from '../jsx-operator.js';

const {
    stringLiteral,
    jsxIdentifier,
    jsxAttribute,
} = types;

export const report = () => `Set position`;

export const fix = ({path, attr, x, y}) => {
    const style = `left: ${x}px; top: ${y}px;`;
    
    if (attr) {
        setAttributeValue(path, 'style', style);
        return;
    }
    
    const {attributes} = path.node.openingElement;
    const attribute = jsxAttribute(jsxIdentifier('style'), stringLiteral(style));
    
    attributes.push(attribute);
};

export const traverse = ({options, push}) => ({
    JSXElement(path) {
        const {name = 'menu', position = {}} = options;
        const {x = 0, y = 20} = position;
        
        if (!hasDataName(path, name))
            return;
        
        const styleAttributeValue = getAttributeValue(path, 'style');
        
        if (!styleAttributeValue) {
            push({
                path,
                x,
                y,
            });
            return;
        }
        
        const [x1, y1] = parsePosition(styleAttributeValue);
        
        if (x === x1 && y === y1)
            return;
        
        const styleAttributePath = getAttributePath(path, 'style');
        
        push({
            path,
            attr: styleAttributePath,
            x,
            y,
        });
    },
});

function parsePosition(str) {
    const [x, y] = str
        .split(/;|left|\s|:|top|px/)
        .filter(Boolean);
    
    return [
        Number(x),
        Number(y),
    ];
}
