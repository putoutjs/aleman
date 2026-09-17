export const keys = [
    'ArrowDown',
    'j',
];

export const filter = ({event, vim}) => {
    if (event.key === 'ArrowDown')
        return true;
    
    const [command] = vim(event);
    
    return command === 'j';
};

export const command = 'down';
