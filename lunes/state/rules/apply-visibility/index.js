import {types} from 'putout';

const {isExpressionStatement} = types;

export const report = () => `Apply visibility`;

export const match = ({options}) => {
    const {operation = 'show'} = options;
    
    return {
        '"off"': (vars, path) => {
            if (operation !== 'show')
                return false;
            
            return isExpressionStatement(path.parentPath.parentPath);
        },
        '"on"': (vars, path) => {
            if (operation !== 'hide')
                return false;
            
            return isExpressionStatement(path.parentPath.parentPath);
        },
    };
};

export const replace = () => ({
    '"off"': '"on"',
    '"on"': '"off"',
});
