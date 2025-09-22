import jessy from 'jessy';
import {getMenuPath as _getMenuPath} from '../menu/get-menu-path.js';

const isFn = (a) => typeof a === 'function';

export const createItemClick = (name) => ({
    name,
    events: ['click'],
    listener,
    filter,
});

const filter = ({event, options}) => {
    const {
        getMenuPath = _getMenuPath,
        menu,
    } = options;
    
    const menuPath = getMenuPath(event);
    const fn = jessy(menuPath, menu);
    
    return isFn(fn);
};

const listener = ({event, options}) => {
    const {
        menu,
        getMenuPath = _getMenuPath,
    } = options;
    
    const menuPath = getMenuPath(event);
    const fn = jessy(menuPath, menu);
    
    setTimeout(fn);
    
    options.beforeHide?.();
    
    return {
        index: -1,
        command: 'hide',
        showSubmenu: false,
    };
};
