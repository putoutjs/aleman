import {calculate} from './calculate.js';

export const setPosition = (name, event) => {
    const element = document.querySelector(`[data-name="${name}"]`);
    const heightMenu = getMenuHeight(element);
    const widthMenu = getMenuWidth(element);
    const {innerHeight, innerWidth} = window;
    
    const {x, y} = calculate(event, {
        heightMenu,
        widthMenu,
        innerWidth,
        innerHeight,
    });
    
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    
    return {
        position: {
            x,
            y,
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
