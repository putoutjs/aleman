import {createTest} from '#test';
import {rules} from '#rules';
import * as addon from './stop-click.js';

const {test, fixture} = createTest(import.meta.url, addon, rules);

test('aleman: stop-click', (t) => {
    t.render(fixture.stopClick);
    t.end();
});
