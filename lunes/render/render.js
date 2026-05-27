import {putout} from 'putout';
import {merge} from '@putout/processor-html';
import * as buildMenu from './rules/build-menu/index.js';

export const render = (state, options) => {
    const {code} = putout(state, {
        rules: {
            'lunes/build-menu': ['on', options],
        },
        plugins: [
            ['lunes/build-menu', buildMenu],
        ],
    });
    
    return merge('', [code]);
};
