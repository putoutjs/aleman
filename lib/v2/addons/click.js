export const name = 'hello';
export const events = ['click'];

export const listener = ({state}) => ({
    index: state.index + 1,
});
