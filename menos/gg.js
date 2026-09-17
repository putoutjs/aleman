export const keys = [
    'g',
    '^',
];

export const filter = ({event, vim}) => {
    if (event.key === '^')
        return true;
    
    const [command] = vim(event);
    
    return command === 'gg';
};

export const command = 'gg';
