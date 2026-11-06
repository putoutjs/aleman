const noop = () => {};

const NAMES = [
    'beforeShow',
    'afterShow',
    'beforeHide',
    'beforeClose',
    'afterHide',
    'beforeClick',
    'afterClick',
];

export const createHooks = (options) => {
    const hooks = {};
    
    for (const name of NAMES)
        hooks[name] = options[name] || noop;
    
    return hooks;
};
