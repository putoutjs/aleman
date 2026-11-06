import css from './menu.css';
import {hydrateMenu} from './hydrate-menu.js';
import {createBundleMenu} from './create-bundle-menu.js';

export const createMenu = createBundleMenu({
    css,
    hydrateMenu,
});
