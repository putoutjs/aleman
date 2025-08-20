const {keys} = Object;

export const initState = ({menu}) => {
    const count = keys(menu);
    
    return {
        command: 'hide',
        index: -1,
        count,
        position: {
            left: 0,
            top: 20,
        },
    };
};
