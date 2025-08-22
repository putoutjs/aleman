const {keys} = Object;

export const initState = ({menu, name = 'menu'}) => {
    const count = keys(menu).length;
    
    return {
        name,
        command: 'hide',
        index: -1,
        count,
        position: {
            x: 0,
            y: 20,
        },
    };
};
