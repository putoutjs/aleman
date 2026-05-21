import {
    template,
    types,
    operator,
} from 'putout';

const {
    isExpressionStatement,
    isObjectProperty,
    jsxText,
    isArrayExpression,
} = types;

const {
    replaceWith,
    removeClassName,
    addClassName,
} = operator;

export const report = () => `Build menu`;
export const include = () => [
    'ObjectProperty',
    'ArrayExpression',
];

const createMenuItem = (path) => {
    const {name} = path.node.key;
    const valuePath = path.get('value');
    
    if (isArrayExpression(valuePath)) {
        const objectPath = valuePath.get('elements').at(-1);
        const children = [];
        
        for (const prop of objectPath.get('properties').map(createMenuItem)) {
            children.push(prop);
            children.push(jsxText('\n'));
        }
        
        const ul = createUL(valuePath);
        
        ul.children = [
            jsxText('\n'),
            ...children,
        ];
        
        return ul;
    }
    
    const selected = path.node.value.value === 'cursor';
    
    const node = template.ast.fresh(`
        <li data-name="menu-item" className="menu-item">
            <label>NAME</label>
        </li>
    `);
    
    const [, labelNode] = node.children;
    
    if (selected)
        addClassName(node, 'menu-item-selected');
    
    labelNode.children[0].value = name;
    
    return node;
};

const createUL = (path) => {
    const show = path.node.elements[0].value === 'open';
    const node = template.ast.fresh(`
        <ul className="menu menu-hidden"></ul>
    `);
    
    if (show)
        removeClassName(node, 'menu-hidden');
    
    return node;
};

export const fix = (path) => {
    if (isObjectProperty(path)) {
        replaceWith(path, createMenuItem(path));
        return;
    }
    
    if (isArrayExpression(path)) {
        const [, second] = path.node.elements;
        const ul = createUL(path);
        
        if (isExpressionStatement(path.parentPath))
            replaceWith(path, ul);
        
        const children = [];
        
        for (const prop of second.properties) {
            children.push(prop);
            children.push(jsxText('\n'));
        }
        
        ul.children = [
            jsxText('\n'),
            ...children,
        ];
        
        return;
    }
};
