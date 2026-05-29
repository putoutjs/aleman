import {putout} from 'putout';
import * as getCursorPlugin from './get-cursor/index.js';

export const getCursor = (state) => {
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
