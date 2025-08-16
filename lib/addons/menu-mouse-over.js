export const name = 'menu';
export const events = ['mouseenter'];
export const listener = ({render, storage}) => {
    storage.set('index', -1);
    render('unselect-all');
};
