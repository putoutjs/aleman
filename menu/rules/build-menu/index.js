import {types, template} from 'putout';

const {entries, keys} = Object;
const noop = () => {};
const {jsxText} = types;

export const report = () => `Build menu`;

const createMenuItem = template(`
    <li data-name="menu-item" className="menu-item">
        <label>NAME</label>
    </li>
`);

const NEWLINE = jsxText('\n');
const INDENT = jsxText(' ');

const DefaultMenu = {
    hello: noop,
    world: noop,
};

export const fix = ({path, menu, icon}) => {
    const items = [];
    
    for (const key of keys(menu)) {
        const menuItem = createMenuItem();
        
        menuItem.children[1].children[0].value = key;
        
        if (icon)
            setIcon(key, menuItem);
        
        items.push(INDENT, menuItem);
    }
    
    items.push(NEWLINE);
    path.parentPath.node.children = items;
};

export const traverse = ({options, push}) => ({
    JSXOpeningElement(path) {
        const {
            name = 'menu',
            menu = DefaultMenu,
            icon = false,
        } = options;
        
        if (!checkDataName(path, name))
            return;
        
        if (path.parentPath.node.children.length)
            return;
        
        push({
            path,
            menu,
            icon,
        });
    },
});

function checkDataName(path, dataName) {
    const {attributes} = path.node;
    
    for (const {name, value} of attributes) {
        if (name.name === 'data-name')
            return value.value === dataName;
    }
    
    return false;
}

function setIcon(name, menuItem) {
    const {attributes} = menuItem.openingElement;
    
    for (const attr of attributes) {
        if (attr.name.name === 'className') {
            attr.value.value += ` icon ${getIconName(name)}`;
            return;
        }
    }
}

function getIconName(name) {
    return 'icon-' + name
        .replace(/[()]/g, '')
        .replace(/\s/g, '-')
        .toLowerCase();
}
