export const printState = ({items}) => {
    const result = [];

    for (const {selected, name, submenu} of items) {
        const mark = selected ? '+' : '-';
        const suffix = submenu ? (submenu.show ? '>' : '*') : '';

        result.push(`${mark}${name}${suffix}`);

        if (submenu?.show)
            for (const {selected, name} of submenu.items)
                result.push(`    ${selected ? '+' : '-'}${name}`);
    }

    return result.join('\n');
};
