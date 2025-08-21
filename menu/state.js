const {keys} = Object;

export const initState = ({menu, name = 'menu'}) => {
    const count = keys(menu);
    
    return {
        name,
        command: 'hide',
        index: -1,
        count,
        position: {
            left: 0,
            top: 20,
        },
    };
};
