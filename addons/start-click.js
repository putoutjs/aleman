export const name = 'start';
export const events = ['click'];
export const listener = ({ast, render}) => {
    return render(ast, ['remove-button-start']);
}