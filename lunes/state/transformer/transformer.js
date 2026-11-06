import {putout} from 'putout';
import {next} from './transforms/next.js';
import {prev} from './transforms/prev.js';
import {hide} from './transforms/hide.js';
import {show} from './transforms/show.js';
import {first} from './transforms/first.js';
import {last} from './transforms/last.js';
import {right} from './transforms/right.js';
import {left} from './transforms/left.js';
import {reset} from './transforms/reset.js';

const transforms = {
    next,
    prev,
    show,
    hide,
    first,
    last,
    right,
    left,
    reset,
};

export const transform = (state, operation, options) => {
    const createConfig = transforms[operation];
    const config = createConfig(options);
    
    const {code} = putout(state, {
        fixCount: 1,
        ...config,
    });
    
    return code;
};
