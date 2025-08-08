export const name = 'stop';
export const events = ['click'];
export const listener = ({ast, render}) => {
    return render(ast, ['remove-button-stop']);
}