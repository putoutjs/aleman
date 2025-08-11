export const name = 'input';
export const events = [
    'keyup',
    'change',
];

export const listener = ({render, event, element}) => {
    let {value} = element;
    
    const {key} = event;
    const keys = [
        'Shift',
        'Meta',
        'ArrowLeft',
        'ArrowRight',
    ];
    
    if (keys.includes(key))
        return;
    
    if (isTextSelected(element) && key === 'Backspace')
        value = '';
    
    render('set-value', {
        name: 'value',
        value,
    });
    
    element.focus();
};

function isTextSelected(input) {
    if (!input.value)
        return false;
    
    return !input.selectionStart && input.selectionEnd === input.value.length;
}

