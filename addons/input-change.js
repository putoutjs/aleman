export const name = 'input';
export const events = ['change'];
export const listener = ({ast, render, event, element}) => {
    const {value} = element;
    
    render(ast, ['set-value'], {
        value,
    });
    
    element.value = value;
    element.focus();
}
