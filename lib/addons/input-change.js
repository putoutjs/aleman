export const name = 'input';
export const events = [
    'keyup',
    'change',
];
export const listener = ({render, event, element}) => {
    let {value} = element;
    const {key} = event;
    
    if (key === 'Shift' || key === 'Meta' || key === 'ArrowLeft' || key === 'ArrowRight')
        return;
    
    if (isTextSelected(element) && event.key === 'Backspace')
        value = '';
    
    render('set-value', {
        value,
    });
    
    element.focus();
};

function isTextSelected(input) {
    if (!input.value)
        return false;
    
    return !input.selectionStart && input.selectionEnd === input.value.length;
}

