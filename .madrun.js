import {run} from 'madrun';

export default {
    'test': () => `tape '**/test/*.js' \
   '**/{menu,aleman,lunes,nemo}/**/*.spec.js'`,
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
