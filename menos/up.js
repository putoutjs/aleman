export const keys = [
    'ArrowUp',
    'k',
];

export const filter = ({event, vim}) => {
    if (event.key === 'ArrowUp')
        return true;
    
    const [command] = vim(event);
    
    return command === 'k';
};

export const command = 'up';
