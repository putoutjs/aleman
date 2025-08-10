export const name = 'stop';
export const events = ['click'];
export const listener = ({render}) => {
    return render('remove-button', {
        name: 'stop',
    });
};
