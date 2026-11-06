import {stub, test} from 'supertape';
import {createHooks} from './hooks.js';

test('lunes: hooks: missing hooks are no-ops', (t) => {
    const hooks = createHooks({});
    const result = hooks.beforeShow({});
    
    t.notOk(result);
    t.end();
});

test('lunes: hooks: the given hook is used', (t) => {
    const beforeClick = stub().returns(true);
    const hooks = createHooks({
        beforeClick,
    });
    
    const result = hooks.beforeClick('menu');
    
    t.ok(result);
    t.end();
});
