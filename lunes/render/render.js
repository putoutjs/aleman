import {putout} from 'putout';
import {merge} from '@putout/processor-html';
import * as buildMenu from './rules/build-menu';

export const render = (state, options) => {
    const {code} = putout(state, {
        printer: ['putout', {
            format: {
                newline: '\n',
                endOfFile: '',
            },
        }],
        rules: {
            'lunes/build-menu': ['on', options],
        },
        plugins: [
            ['lunes/build-menu', buildMenu],
        ],
    });
    
    const prefix = '<template>';
    const suffix = '<\\template>\n';
    
    const result = merge('', [code])
        .slice(prefix.length, -suffix.length)
        .trim();
    
    return result;
};
