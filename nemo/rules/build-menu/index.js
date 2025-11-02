import {
    template,
    types,
    operator,
} from 'putout';

const {
    setAttributeValue,
    addClassName,
    removeClassName,
    hasDataName,
} = operator;

const {jsxText} = types;

export const report = () => `Build menu`;

const createMenuItem = ({name, path, index, selected, submenu}) => {
    const node = template.ast.fresh(`
        <li data-name="menu-item" data-menu-index="0" data-menu-path="PATH" className="menu-item">
            <label data-menu-path="PATH">NAME</label>
        </li>
    `);
    
    const [, labelNode] = node.children;
    
    setAttributeValue(node, 'data-menu-index', index);
    setAttributeValue(node, 'data-menu-path', path);
    setAttributeValue(labelNode, 'data-menu-path', path);
    
    if (selected)
        addClassName(node, 'menu-item-selected');
    
    labelNode.children[0].value = name;
    
    if (submenu)
        node.children.push(submenu);
    
    return node;
};

const createUL = ({show}) => {
    const node = template.ast.fresh(`
        <ul data-name="submenu" className="menu menu-hidden"></ul>
    `);
    
    if (show)
        removeClassName(node, 'menu-hidden');
    
    return node;
};

function createMenu(menu) {
    const children = [];
    
    for (const [index, {name, path, selected, submenu}] of menu.items.entries()) {
        const current = createMenuItem({
            name,
            path,
            index,
            selected,
        });
        
        if (submenu) {
            const ul = createUL(submenu);
            ul.children.push(...createMenu(submenu));
            current.children.push(ul);
            current.children.push(jsxText('\n'));
        }
        
        children.push(jsxText('\n'));
        children.push(current);
    }
    
    children.push(jsxText('\n'));
    
    return children;
}

export const fix = ({path, menu}) => {
    path.node.children = createMenu(menu);
    
    if (menu.show)
        removeClassName(path, 'menu-hidden');
    else
        addClassName(path, 'menu-hidden');
};

export const traverse = ({options, push}) => ({
    JSXElement(path) {
        const {name = 'menu'} = options;
        
        if (!hasDataName(path, name))
            return;
        
        push({
            path,
            menu: options,
        });
    },
});
