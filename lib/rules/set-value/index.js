export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const match = ({options}) => {
    const {name} = options;
    
    return {
        '<__a __jsx_attributes>__b</__a>': check(name),
        '<__a __jsx_attributes></__a>': check(name),
    };
};

const check = (dataName) => ({__a, __jsx_attributes}) => {
    if (__a.name !== 'label')
        return false;
    
    for (const {name, value} of __jsx_attributes) {
        if (name.name !== 'data-name')
            continue;
        
        if (value.value === dataName)
            return true;
    }
    
    return false;
};

export const replace = ({options}) => {
    const {value = 'hello', escape = (a) => a} = options;
    
    return {
        '<__a __jsx_attributes>__b</__a>': `<__a __jsx_attributes>${escape(value)}</__a>`,
        '<__a __jsx_attributes></__a>': `<__a __jsx_attributes>${escape(value)}</__a>`,
    };
};
