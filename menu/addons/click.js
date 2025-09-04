export const events = ['click'];

export const filter = ({state}) => state.command === 'show';

export const listener = ({options, state}) => {
    options.beforeHide?.(state);
    
    return {
        command: 'hide',
        index: -1,
        showSubmenu: false,
    };
};
