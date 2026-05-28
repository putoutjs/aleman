import {putout} from 'putout';
import {next} from './transforms/next.js';
import {prev} from './transforms/prev.js';
import {hide} from './transforms/hide';
import {show} from './transforms/show';

const transforms = {
    next,
    prev,
    show,
    hide,
};

export const transform = (state, operation, options) => {
    const createConfig = transforms[operation];
    const config = createConfig(options);
    const {code} = putout(state, config);
    
    return code;
};

