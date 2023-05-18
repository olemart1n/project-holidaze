const keyAccessibility = (e) => {
    let activeItem;
    if (count > 0 && e.keyCode === 40) {
        const previousItem = document.querySelector(".current-suggestion-item");
        activeItem = previousItem.nextElementSibling;
        previousItem.className = "previous-suggestion-item";
        activeItem.className = "current-suggestion-item";
        previousItem.style.backgroundColor = "#fff";
        activeItem.style.backgroundColor = "#faface";
        setCount((count) => count + 1);
    } else if (e.keyCode === 40) {
        // activeItem.style.backgroundColor = "#faface";
        // activeItem.previousElementSibling.style.backgroundColor = "fff";
        activeItem = document.querySelector(".suggestion-item0");
        activeItem.style.backgroundColor = "#faface";
        activeItem.className = "current-suggestion-item";
        setCount((count) => count + 1);
    }
};
const keyAccessibility1 = (e) => {
    let currentItem = e.currentTarget;
    if (e.keyCode === 40 && currentItem.nextElementSibling) {
        currentItem.tabIndex = 0;
        currentItem.nextElementSibling.setAttribute("tabIndex", 1);
        currentItem.nextElementSibling.focus();
    }
    if (e.keyCode === 38 && !currentItem.previousElementSibling) {
        const parent = currentItem.parentNode;
        const parentSibling = parent.previousElementSibling;
        parentSibling.children[1].focus();
    }
    if (e.keyCode === 38 && currentItem.previousElementSibling) {
        currentItem.tabIndex = 0;
        currentItem.previousElementSibling.setAttribute("tabIndex", 1);
        currentItem.previousElementSibling.focus();
    }
    if (e.keyCode === 13) {
        currentItem.click();
    }
};

const changeFocus = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
        listItem.current.focus();
    } else return;
};
export default keyAccessibility;
