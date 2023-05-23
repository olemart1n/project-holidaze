export const openDialog = (type) => {
    const dialogModal = document.querySelector("[data-modal]");
    if (dialogModal.getAttribute("type") === type) {
        dialogModal.showModal();
    }
};
export const openDialogSmall = (type) => {
    const dialogModal = document.querySelector("[data-modal]");
    if (dialogModal.getAttribute("type") === type) {
        dialogModal.show();
    }
};

export const closeDialog = () => {
    const dialogModal = document.querySelector("[data-modal]");
    dialogModal.close();
};

export const extraCloseFunctionality = (e) => {
    const dialogModal = document.querySelector("[data-modal]");
    const dialog = dialogModal.getBoundingClientRect();
    if (
        e.clientX < dialog.left ||
        e.clientX > dialog.right ||
        e.clientY < dialog.top ||
        e.clientY > dialog.bottom
    ) {
        dialogModal.close();
    }
};

export const preventDialogClose = (e) => {
    // e.preventDefault();
    e.stopPropagation();
};
