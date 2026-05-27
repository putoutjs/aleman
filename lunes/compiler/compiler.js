export const createCompiler = (element, {commit, render}) => (operation, cursor) => {
    const state = commit(operation);
    
    element.innerHTML = render(state, cursor);
};
