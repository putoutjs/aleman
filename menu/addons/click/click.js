import jessy from 'jessy';
import {getMenuPath as _getMenuPath} from '../menu/get-menu-path.js';

const isFn = (a) => typeof a === 'function';

export const events = ['click'];
export const preventDefault = true;

export const filter = ({event, state, options}) => {
    const {
        menu,
        getMenuPath = _getMenuPath,
    } = options;
    
    if (state.command === 'hide')
        return false;
    
    const menuPath = getMenuPath(event);
    
    if (!menuPath)
        return true;
    
    const fn = jessy(menuPath, menu);
    
    return isFn(fn);
};

export const listener = ({options, state}) => {
    options.beforeHide?.(state);
    
    return {
        command: 'hide',
        index: -1,
        showSubmenu: false,
        insideSubmenu: false,
    };
};
