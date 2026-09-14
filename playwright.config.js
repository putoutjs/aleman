import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    webServer: {
        command: 'bunx serve . -p 3000',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {name: 'menu', use: {baseURL: 'http://localhost:3000/example/menu/'}},
        {name: 'nemo', use: {baseURL: 'http://localhost:3000/example/nemo/'}},
    ],
});
