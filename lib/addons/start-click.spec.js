import {rules} from '#rules';
import {createTest} from '#test';
import * as addon from './start-click.js';

const {test, fixture} = createTest(import.meta.url, addon, rules);

test('aleman: addons: start-click', (t) => {
    t.render(fixture.startClick);
    t.end();
});

