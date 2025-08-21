const {keys} = Object;

export const initState = ({menu}) => {
    const count = keys(menu);
    
    return {
        menuName: 'menu',
        command: 'hide',
        index: -1,
        count,
        position: {
            left: 0,
            top: 20,
        },
    };
};
