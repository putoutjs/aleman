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
    setAttributeValue,
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
        
        const submenu = createSubmenu(valuePath);
        
        submenu.children[3].children = [
            jsxText('\n'),
            ...children,
        ];
        
        return submenu;
    }
    
    const selected = path.node.value.value === 'cursor';
    const classSelected = selected ? ' menu-item-selected' : '';
    
    const node = template.ast.fresh(`
        <li data-name="menu-item" className="menu-item${classSelected}">
            <label>${name}</label>
        </li>
    `);
    
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

const createSubmenu = (path) => {
    const {name} = path.parentPath.node.key;
    
    const selected = path.node.elements[1].value === 'cursor';
    const show = path.node.elements[0].value === 'open';
    
    const menuHidden = show ? '' : ' menu-hidden';
    const classSelected = selected ? '  menu-item-selected' : '';
    
    const node = template.ast.fresh(`
        <li data-name="menu-item" className="menu-item${classSelected}">
            <label>${name}</label>
            <ul className="menu${menuHidden}"></ul>
        </li>
    `);
    
    return node;
};

const parsePosition = (path) => {
    const [left, top] = path
        .node
        .elements
        .at(-2)
        .value
        .split(':');
    
    return {
        left,
        top,
    };
};

export const fix = (path) => {
    if (isObjectProperty(path)) {
        replaceWith(path, createMenuItem(path));
        return;
    }
    
    if (isArrayExpression(path)) {
        const ul = createUL(path);
        
        if (isExpressionStatement(path.parentPath)) {
            replaceWith(path, ul);
            
            const {left, top} = parsePosition(path);
            
            setAttributeValue(ul, 'style', `left: ${left}px; top: ${top}px`);
        }
        
        const {properties} = path.node.elements.at(-1);
        const children = [];
        
        for (const prop of properties) {
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
