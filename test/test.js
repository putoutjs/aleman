import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {extend} from 'supertape';
import {createRender} from '../lib/aleman/render.js';
import {readFixtures} from './fixture.js';

export const createTest = (url, addon, rules) => {
    const __filename = fileURLToPath(url);
    const dir = dirname(__filename);
    const fixture = readFixtures(dir);
    const test = extend({
        render: render({
            addon,
            rules,
        }),
    });
    
    return {
        fixture,
        test,
    };
};

const render = ({addon, rules}) => (operator) => (html, modules = {}) => {
    const element = {};
    const {state = {}} = modules;
    const render = createRender(html.input, {
        element,
        headless: true,
        addons: [addon],
        state,
        rules,
        ...modules,
    });
    
    debugger;
    addon.listener({
        render: render(addon.name),
        ...modules,
    });
    
    return operator.equal(html.output, element.innerHTML);
};

