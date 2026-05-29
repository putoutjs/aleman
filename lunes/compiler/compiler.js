import {fullstore} from 'fullstore';

export const createCompiler = (element, {commit, render, mainOptions = fullstore()}) => (operation, options) => {
    const state = commit(operation);
    const allOptions = {
        ...options,
        ...mainOptions(),
    };
    
    element.innerHTML = render(state, allOptions);
    
    mainOptions(allOptions);
};
