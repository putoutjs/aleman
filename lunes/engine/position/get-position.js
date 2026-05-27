import {calculate} from './calculate.js';

export const getPosition = (name, event) => {
    const element = document.querySelector(`[data-name="${name}"]`);
    const heightMenu = getMenuHeight(element);
    const widthMenu = getMenuWidth(element);
    const {innerHeight, innerWidth} = globalThis;
    
    const {x, y} = calculate(event, {
        heightMenu,
        widthMenu,
        innerWidth,
        innerHeight,
    });
    
    const left = x;
    const top = y;
    
    return {
        position: {
            left,
            top,
        },
    };
};

function getMenuHeight(element) {
    const {height} = getComputedStyle(element);
    return parseInt(height, 10);
}

function getMenuWidth(element) {
    const {width} = getComputedStyle(element);
    return parseInt(width, 10);
}
