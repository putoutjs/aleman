export const name = 'menu-toggler';
export const events = ['click'];
export const listener = ({render, element}) => {
    const command = element.getAttribute('command') === 'show' ? 'hide' : 'show';
    
    render('menu', {
        command,
    });
};
