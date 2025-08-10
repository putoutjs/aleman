export const report = ({name}) => {
    return `Remove button ${name}`;
};

export const match = ({options}) => ({
    '<button __jsx_attributes>__a</button>': (vars, path) => {
        const defaultName = options.name || '';
        const name = getName(path);
        
        return name === defaultName;
    },
});

export const replace = () => ({
    '<button __jsx_attributes>__a</button>': '',
});

function getName(path) {
    const {attributes} = path.node.openingElement;
    
    for (const {name, value} of attributes) {
        if (name.name !== 'data-name')
            continue;
        
        return value.value;
    }
    
    return '';
}
