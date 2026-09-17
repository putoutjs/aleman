import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 120_000,
    webServer: {
        command: 'bunx serve . -p 3000',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
    projects: [{
        name: 'menu',
        testIgnore: '**/bundles.spec.js',
        use: {
            baseURL: 'http://localhost:3000/example/menu/',
        },
    }, {
        name: 'nemo',
        testIgnore: '**/bundles.spec.js',
        use: {
            baseURL: 'http://localhost:3000/example/nemo/',
        },
    }, {
        name: 'menos',
        testIgnore: '**/bundles.spec.js',
        use: {
            baseURL: 'http://localhost:3000/example/menos/',
        },
    }, {
        name: 'bundle',
        testMatch: '**/bundles.spec.js',
        use: {
            baseURL: 'http://localhost:3000',
        },
    }],
});
