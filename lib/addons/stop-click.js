export const name = 'stop';
export const events = ['click'];
export const listener = ({render}) => {
    render('remove-button', {
        name: 'stop',
    });
};
