import {putout} from 'putout';
import * as getCursorPlugin from './get-cursor/index.js';

export const getCursorPath = (state) => {
    const {places} = putout(state, {
        fix: false,
        plugins: [
            ['lunes/get-cursor', getCursorPlugin],
        ],
    });
    
    if (!places.length)
        return '';
    
    const {message} = places[0];
    
    return message;
};

export const getCursor = (state) => getCursorPath(state)
    .split('.')
    .at(-1);
