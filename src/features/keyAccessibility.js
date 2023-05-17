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

export default keyAccessibility;
