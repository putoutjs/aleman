export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const match = () => ({
    '<__a __jsx_attributes>__b</__a>': ({__a}) => __a.name === 'label',
    '<__a __jsx_attributes></__a>': ({__a}) => __a.name === 'label',
});

export const replace = ({options}) => {
    const {value = 'hello', escape = (a) => a} = options;
    
    return {
        '<__a __jsx_attributes>__b</__a>': `<__a __jsx_attributes>${escape(value)}</__a>`,
        '<__a __jsx_attributes></__a>': `<__a __jsx_attributes>${escape(value)}</__a>`,
    };
};
