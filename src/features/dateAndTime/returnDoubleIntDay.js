export const returnDoubleIntDay = (date) => {
    if (date.toString().length === 1) {
        return "0" + date.toString();
    } else return date.toString();
};
