import {join} from 'node:path';
import {readFileSync} from 'node:fs';
import tryCatch from 'try-catch';
import kebabCase from 'just-kebab-case';

const readFixture = (dir, name) => {
    const dirFixture = join(dir, 'fixture');
    const longName = join(dirFixture, name);
    
    const input = readFileSync(`${longName}.html`, 'utf8');
    const output = readFileSync(`${longName}-fix.html`, 'utf8');
    
    return {
        input,
        output,
    };
};

export const readFixtures = (dir) => {
    return new Proxy({}, createHandler(dir));
};

const createHandler = (dir) => ({
    get(obj, prop) {
        return readFixture(dir, kebabCase(prop));
    },
});

