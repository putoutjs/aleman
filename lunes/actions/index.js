import up from './up.json' with {
    type: 'json',
};
import down from './down.json' with {
    type: 'json',
};
import click from './click.json' with {
    type: 'json',
};
import contextMenu from './context-menu.json' with {
    type: 'json',
};

export const actions = [
    up,
    down,
    click,
    contextMenu,
];
