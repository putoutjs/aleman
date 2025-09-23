import {createVimParser} from './vim.js';
import {
    emitBefore,
    emitIf,
    emitRun,
} from './emit.js';

const queryElement = ({name}) => {
    return document.querySelector(`[data-name="${name}"]`);
};

const maybeEvents = ({events}) => {
    if (events)
        return events;
    
    return ['keydown'];
};

export const addListeners = ({namedAddons, options, readState, writeState}) => {
    for (const addon of namedAddons) {
        const element = queryElement(addon);
        const events = maybeEvents(addon);
        
        for (const event of events) {
            element.addEventListener(event, createListener({
                addon,
                options,
                readState,
                writeState,
            }));
        }
    }
};

const hasName = ({name}) => name;

export const splitAddons = (addons) => {
    const globalAddons = [];
    const namedAddons = [];
    
    for (const addon of addons) {
        if (hasName(addon)) {
            namedAddons.push(addon);
            continue;
        }
        
        globalAddons.push(addon);
    }
    
    return {
        globalAddons,
        namedAddons,
    };
};

export const addGlobalListeners = ({globalAddons, options, readState, writeState, document = globalThis.document}) => {
    for (const addon of globalAddons) {
        const events = maybeEvents(addon);
        
        for (const event of events) {
            document.addEventListener(event, createListener({
                addon,
                options,
                readState,
                writeState,
            }));
        }
    }
};

const createListener = ({options, addon, readState, writeState, parseVim = createVimParser()}) => (event) => {
    const {
        preventDefault,
        stopPropagation,
        after,
        afterIf,
    } = addon;
    
    const [isEmitBefore, count] = emitBefore(addon, {
        event,
        parseVim,
    });
    
    if (!isEmitBefore)
        return false;
    
    const state = readState();
    
    const is = emitIf(addon, {
        event,
        state,
        options,
    });
    
    if (!is)
        return;
    
    if (preventDefault)
        event.preventDefault();
    
    if (stopPropagation)
        event.stopPropagation();
    
    const newState = emitRun(addon, {
        count,
        event,
        state,
        options,
    });
    
    writeState(newState);
    
    const isAfterIf = !afterIf || afterIf({
        state: newState,
        options,
    });
    
    if (after && isAfterIf)
        requestAnimationFrame(() => {
            writeState(after({
                event,
                state: newState,
                options,
            }));
        });
};
