import base from './playwright.config.js';

const executablePath = process.env.CHROME_PATH;

export default {
    ...base,
    projects: base.projects.map((project) => ({
        ...project,
        use: {
            ...project.use,
            launchOptions: {executablePath},
        },
    })),
};
