export const events = ['keydown'];
export const listener = ({render, element}) => {
    const {index} = element;
    
    render('select-next', {
        index: index + 1,
    });
};
