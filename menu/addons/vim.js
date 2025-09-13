import * as up from './up.js';
import * as down from './down.js';
import {getSubmenu} from './submenu/index.js';

const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';

export const createVim = () => {
    const buffer = [];
    
    return {
        events,
        filter,
        listener: createListener(buffer),
    };
};

const events = ['keydown'];

const filter = ({state}) => state.command === 'show';

const createListener = (buffer) => ({event, state, options}) => {
    const {key} = event;
    const {index} = state;
    
    const menuCount = Object.keys(options.menu).length;
    const submenuCount = Object.keys(getSubmenu({
        index,
        options,
    })).length;
    
    if (!buffer.length && key === 'g') {
        buffer.push('g');
        return null;
    }
    
    if (!buffer.length && /\d/.test(key)) {
        buffer.push(Number(key));
        return null;
    }
    
    if (!buffer.length && key === 'j')
        buffer.push(1);
    
    if (!buffer.length && key === 'k')
        buffer.push(1);
    
    const [first] = buffer;
    
    if (isNumber(first) && key === 'j') {
        buffer = [];
        const {insideSubmenu, submenuIndex} = state;
        
        let newIndex = insideSubmenu ? index : index + first - 1;
        let newSubmenuIndex = insideSubmenu ? submenuIndex + first : submenuIndex;
        
        if (newIndex > menuCount - 1)
            newIndex = menuCount - 1;
        
        if (newSubmenuIndex > submenuCount - 1)
            newSubmenuIndex = submenuCount - 1;
        
        const newState = {
            ...state,
            index: newIndex,
            submenuIndex: newSubmenuIndex,
        };
        
        return down.listener({
            state: newState,
            options,
        });
    }
    
    if (isNumber(first) && key === 'k') {
        buffer = [];
        const {
            insideSubmenu,
            index,
            submenuIndex,
        } = state;
        
        let newIndex = insideSubmenu ? index : index - first - 1;
        let newSubmenuIndex = insideSubmenu ? submenuIndex - first - 1 : submenuIndex;
        
        if (newIndex < -1)
            newIndex = -1;
        
        if (newSubmenuIndex < -1)
            newSubmenuIndex = -1;
        
        const newState = {
            ...state,
            index: newIndex,
            submenuIndex: newSubmenuIndex,
        };
        
        return down.listener({
            state: newState,
            options,
        });
    }
    
    if (first === 'g' && key === 'g') {
        buffer = [];
        const {
            insideSubmenu,
            index,
            submenuIndex,
        } = state;
        
        const newState = {
            ...state,
            index: insideSubmenu ? index : 1,
            submenuIndex: insideSubmenu ? 1 : submenuIndex,
        };
        
        return up.listener({
            state: newState,
            options,
        });
    }
    
    buffer = [];
};
