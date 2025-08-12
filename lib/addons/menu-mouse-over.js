export const name = 'menu';
export const events = ['mouseenter'];
export const listener = ({render, element}) => {
    const el = element.querySelector('.menu-item-selected');
    
    if (!el)
        return;
    
    render('unselect-all');
};
