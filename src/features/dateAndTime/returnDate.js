export const returnDate = (date) => {
    const jsonDate = new Date(date);
    return jsonDate.getDate();
};
