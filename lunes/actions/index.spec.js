import {test} from 'supertape';
import * as actions from './index.js';

test('lunes: actions: every action has operations', (t) => {
    const result = Object.values(actions).every((a) => a.default.operations.length);
    
    t.ok(result);
    t.end();
});
