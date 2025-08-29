import {template, operator} from 'putout';
import {checkDataName} from '../check-data-name.js';

const {setLiteralValue} = operator;
const {entries} = Object;

const noop = () => {};
const isObject = (a) => a && typeof a === 'object';

export const report = () => `Build menu`;

const createMenuItem = template(`
    <li data-name="menu-item" className="menu-item"><label>NAME</label></li>
`);

const createMenu = template(`
    <ul data-name="menu" className="menu menu-hidden"></ul>
`);

const DefaultMenu = {
    hello: noop,
    world: noop,
};

export const fix = ({path, menu, icon}) => {
    const {children} = path.parentPath.node;
    
    for (const [key, value] of entries(menu)) {
        const menuItem = createMenuItem();
        
        menuItem.children[0].children[0].value = key;
        
        if (icon)
            setIcon(key, menuItem);
        
        children.push(menuItem);
        
        if (isObject(value)) {
            setSubmenu(menuItem);
            menuItem.children.push(createMenu());
            
            const openingElement = path.parentPath
                .get('children')
                .at(-1)
                .get('children.1.openingElement');
            
            fix({
                path: openingElement,
                icon,
                menu: value,
            });
        }
    }
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

function setSubmenu(menuItem) {
    const {attributes} = menuItem.openingElement;
    
    for (const attr of attributes) {
        if (attr.name.name === 'className') {
            setLiteralValue(attr.value, `${attr.value.value} menu-submenu`);
            break;
        }
    }
}

function setIcon(name, menuItem) {
    const {attributes} = menuItem.openingElement;
    
    for (const attr of attributes) {
        if (attr.name.name === 'className') {
            setLiteralValue(attr.value, `${attr.value.value} icon ${getIconName(name)}`);
            break;
        }
    }
}

function getIconName(name) {
    return 'icon-' + name
        .replace(/[()]/g, '')
        .replace(/\s/g, '-')
        .toLowerCase();
}

