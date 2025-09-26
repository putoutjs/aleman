import {
    template,
    operator,
    types,
} from 'putout';

const {jsxText} = types;
const {
    setAttributeValue,
    hasDataName,
    addClassName,
} = operator;

const {entries} = Object;

const isObject = (a) => a && typeof a === 'object';

export const report = () => `Build menu`;

const createMenuItem = template(`
    <li data-name="menu-item" data-menu-index="" className="menu-item" data-menu-path="">
        <label data-menu-path="">NAME</label>
    </li>
`);

const createMenu = template(`
    <ul data-name="menu" className="menu menu-hidden"></ul>
`);

const DefaultMenu = {
    hello: null,
    world: null,
};

const NEWLINE = jsxText('\n');
const INDENT = jsxText(' ');

export const fix = ({path, menu, icon, name = ''}) => {
    const {children} = path.node;
    let i = 0;
    
    for (const [key, value] of entries(menu)) {
        const menuItem = createMenuItem();
        
        menuItem.children[1].children[0].value = key;
        
        if (icon)
            setIcon(key, menuItem);
        
        setDataMenuIndex(i++, menuItem);
        setDataMenuPath(key, name, menuItem);
        
        setDataMenuPath(key, name, menuItem.children[1]);
        children.push(INDENT, menuItem);
        
        if (isObject(value)) {
            setSubmenu(menuItem);
            menuItem.children.push(createMenu());
            
            const elementPath = path.get('children').at(-1)
                .get('children.3');
            
            fix({
                path: elementPath,
                icon,
                menu: value,
                name: key,
            });
        }
    }
    
    children.push(NEWLINE);
};

export const traverse = ({options, push}) => ({
    JSXElement(path) {
        const {
            name = 'menu',
            menu = DefaultMenu,
            icon = false,
        } = options;
        
        if (!hasDataName(path, name))
            return;
        
        if (path.node.children.length)
            return;
        
        push({
            path,
            menu,
            icon,
        });
    },
});

function setSubmenu(menuItem) {
    addClassName(menuItem, 'menu-submenu');
}

function setDataMenuPath(key, name, menuItem) {
    const dataMenuPath = name ? `${name}.${key}` : key;
    setAttributeValue(menuItem, 'data-menu-path', dataMenuPath);
}

function setDataMenuIndex(index, menuItem) {
    setAttributeValue(menuItem, 'data-menu-index', index);
}

function setIcon(name, menuItem) {
    addClassName(menuItem, `icon ${getIconName(name)}`);
}

function getIconName(name) {
    return 'icon-' + name
        .replace(/[()]/g, '')
        .replace(/\s/g, '-')
        .toLowerCase();
}
