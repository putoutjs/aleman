import {run} from 'madrun';

export default {
    'test': () => `tape '**/test/*.js' \
   '**/{menu,aleman,lunes}/**/*.spec.js' \
   'nemo/addons/left.spec.js' \
   'nemo/addons/right.spec.js' \
   'nemo/addons/set-position/calculate.spec.js' \
   'nemo/rules/build-menu/index.spec.js' \
   'nemo/state/state.spec.js' \
   'nemo/addons/gg/gg.spec.js' \
   'nemo/addons/shift-g/shift-g.spec.js' \
   'nemo/addons/j/j.spec.js' \
   'nemo/addons/k/k.spec.js' \
   'nemo/addons/escape/escape.spec.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x "${await run('test')}"`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'test:e2e': () => `playwright test`,
    'test:e2e:menu': () => `playwright test --project=menu`,
    'test:e2e:nemo': () => `playwright test --project=nemo`,
};
