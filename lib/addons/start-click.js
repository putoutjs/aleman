export const name = 'start';
export const events = ['click'];
export const listener = ({render}) => {
    return render('remove-button', {
        name: 'start',
    });
}