export const name = 'menu-toggler';
export const events = ['click'];
export const listener = ({render, element}) => {
    const command = element.command === 'show' ? 'hide' : 'show';
    
    render('menu', {
        command,
    });
};
