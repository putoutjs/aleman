export function calculate(event, sizes) {
    let {clientX, clientY} = event;
    const {
        heightMenu,
        widthMenu,
        innerHeight,
        innerWidth,
    } = sizes;
    
    if (innerWidth < widthMenu + clientX + clientX / 2) {
        clientX -= widthMenu;
        
        if (clientX < 0)
            clientX = 0;
    }
    
    if (innerHeight < heightMenu + clientY) {
        clientY -= heightMenu;
        
        if (clientY < 0)
            clientY = 0;
    }
    
    return {
        x: clientX,
        y: clientY - 14,
    };
}
