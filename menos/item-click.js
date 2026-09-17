import {jessy} from 'jessy';

const isFn = (a) => typeof a === 'function';
const {values} = Object;

// the only addon with real logic — DOM target -> menu path -> callback
export const createItemClick = (name) => ({
    name,
    event: 'click',
    command: 'run',
    filter: ({event, options}) => isFn(getFn(event, options)),
});

export const run = ({event, state, options}) => {
    const fn = getFn(event, options);
    
    setTimeout(fn);
    
    return {
        ...state,
        command: 'hide',
        show: false,
    };
};

// keyboard "click": found by index, not by screen coordinates
export const runByIndex = ({state, options}) => {
    const {
        index,
        submenuIndex,
        insideSubmenu,
    } = state;
    const {menu} = options;
    const fn = values(menu)[index];
    const current = isObject(fn) && insideSubmenu ? values(fn)[submenuIndex] : fn;
    
    if (!isFn(current))
        return state;
    
    setTimeout(current);
    
    return {
        ...state,
        command: 'hide',
        show: false,
    };
};

const isObject = (a) => a && typeof a === 'object';

const getFn = (event, {menu, getMenuPath = defaultGetMenuPath}) => jessy(getMenuPath(event), menu);

function defaultGetMenuPath(event) {
    let element = document.elementFromPoint(event.clientX, event.clientY);
    const {menuPath} = element.dataset;
    
    if (!menuPath)
        element = element.querySelector('[data-menu-path]');
    
    if (!element?.dataset.menuPath)
        return '';
    
    return element.dataset.menuPath;
}
