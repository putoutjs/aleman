export const name = 'stop';
export const events = ['click'];
export const listener = ({ast, render}) => {
    return render('remove-button', {
        name: 'stop',
    });
}