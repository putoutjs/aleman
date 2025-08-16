export const name = 'input';
export const events = [
    'keyup',
    'change',
];

export const filter = ({event}) => {
    const {key} = event;
    const keys = [
        'Shift',
        'Meta',
        'ArrowLeft',
        'ArrowRight',
    ];
    
    return !keys.includes(key);
};

export const listener = ({render, event, element}) => {
    const {key} = event;
    let {value} = element;
    
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
