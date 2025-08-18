export const setButtonName = ({index}) => {
    const buttonElement = document.querySelector('[data-name="hello"]');
    buttonElement.textContent = index;
};
