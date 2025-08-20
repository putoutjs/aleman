document.addEventListener('DOMContentLoaded', async function load() {
    const {createMenu} = await import('../main.js');
    await createMenu();
    document.removeEventListener('DOMContentLoaded', load);
});
