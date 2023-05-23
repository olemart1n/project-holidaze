export const timeGap = (starts, ends) => {
    const expiryDate = new Date(ends);
    const startDate = new Date(starts);

    const gap = expiryDate - startDate;
    return gap / (1000 * 3600 * 24);
};
