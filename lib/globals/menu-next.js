export const events = ['keydown'];

export const filter = ({event, state}) => {
    if (event.key !== 'ArrowDown')
        return false;
    
    const {command} = state['menu-toggler'] || {
        command: 'show',
    };
    
    return command !== 'hide';
};
export const listener = ({render, element}) => {
    const index = element.index || 0;
    
    render('select-next', {
        index: index + 1,
    });
};
