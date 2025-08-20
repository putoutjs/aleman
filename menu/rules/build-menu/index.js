import {types, template} from 'putout';

const {entries} = Object;
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

export const fix = ({path, menu}) => {
    const items = [];
    
    for (const [key] of entries(menu)) {
        const menuItem = createMenuItem();
        
        menuItem.children[1].children[0].value = key;
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
        } = options;
        
        if (!checkDataName(path, name))
            return;
        
        if (path.parentPath.node.children.length)
            return;
        
        push({
            path,
            menu,
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
