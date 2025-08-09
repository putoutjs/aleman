import * as setValue from './set-value/index.js';

export const rules = {
    'remove-button-start': {
        report: () => '',
        replace: () => ({
            '<button __jsx_attributes>hello</button>': '',
        }),
    },
    'remove-button-stop': {
        report: () => '',
        replace: () => ({
            '<button __jsx_attributes>world</button>': '',
        }),
    },
    'set-value': setValue,
};
