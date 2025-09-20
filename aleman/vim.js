const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';

export const createVimParser = (buffer = []) => ({key}) => {
    if (/F\d/.test(key)) {
        buffer = [];
        return [''];
    }
    
    if (key === '^')
        return ['^'];
    
    if (key === '$')
        return ['$'];
    
    if (!buffer.length && key === 'g') {
        buffer.push('g');
        return [''];
    }
    
    if (!buffer.length && /\d/.test(key)) {
        buffer.push(Number(key));
        return [''];
    }
    
    if (!buffer.length && key === 'j')
        buffer.push(1);
    
    if (!buffer.length && key === 'k')
        buffer.push(1);
    
    const [count] = buffer;
    
    if (isNumber(count) && key === 'j') {
        buffer = [];
        return ['j', count];
    }
    
    if (isNumber(count) && key === 'k') {
        buffer = [];
        return ['k', count];
    }
    
    if (count === 'g' && key === 'g') {
        buffer = [];
        return ['gg'];
    }
    
    buffer = [];
    return [''];
};
