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

const isOn = ({node}) => {
    if (isObjectProperty(node))
        return node.value.value;
    
    return node.elements[0].value === 'on';
};

const isSelected = ({node}) => {
    if (isObjectProperty(node))
        return node.value.value;
    
    return node.elements[1].value === 'cursor';
};

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
    
    const classSelected = isSelected(path) ? 'menu-item-selected' : '';
    
    const node = template.ast.fresh(`
        <li data-name="menu-item" className="menu-item${classSelected}">
            <label>${name}</label>
        </li>
    `);
    
    return node;
};

const createUL = (path) => {
    const node = template.ast.fresh(`
        <ul className="menu menu-hidden"></ul>
    `);
    
    if (isOn(path))
        removeClassName(node, 'menu-hidden');
    
    return node;
};

const createSubmenu = (path) => {
    const {name} = path.parentPath.node.key;
    const menuHidden = isOn(path) ? '' : ' menu-hidden';
    const classSelected = isSelected(path) ? '  menu-item-selected' : '';
    
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
