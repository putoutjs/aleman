export const keys = [
    'ArrowUp',
    'k',
];

export const preventDefault = true;

export const listener = ({state}) => {
    let {index} = state;
    
    if (index)
        --index;
    
    return {
        index,
    };
};
