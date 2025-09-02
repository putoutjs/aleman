export const setPosition = (name, event) => {
    const element = document.querySelector(`[data-name="${name}"]`);
    const {x, y} = calculate(element, event);
    
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    
    return {
        position: {
            x,
            y,
        },
    };
};

function calculate(element, {clientX, clientY}) {
    const heightMenu = getMenuHeight(element);
    const widthMenu = getMenuWidth(element);
    const heightInner = window.innerHeight;
    const widthInner = window.innerWidth;
    
    if (widthInner < widthMenu + clientX) {
        clientX -= widthMenu;
        
        if (clientX < 0)
            clientX = 0;
    }
    
    if (heightInner < heightMenu + clientY) {
        clientY -= heightMenu;
        
        if (clientY < 0)
            clientY = 0;
    }
    
    return {
        x: clientX,
        y: clientY - 14,
    };
}

function getMenuHeight(element) {
    const {height} = getComputedStyle(element);
    return parseInt(height, 10);
}

function getMenuWidth(element) {
    const {width} = getComputedStyle(element);
    return parseInt(width, 10);
}

