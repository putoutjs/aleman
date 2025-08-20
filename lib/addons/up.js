export const key = 'ArrowUp';

export const listener = ({state}) => {
    let {index} = state;
    
    if (index)
        --index;
    
    return {
        index,
    };
};

