export const events = ['keydown'];
export const listener = ({render, element}) => {
    const index = element.index || 0;
    
    render('select-next', {
        index: index + 1,
    });
};
