const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const returnDay = (date) => {
    const jsonDate = new Date(date);
    const day = jsonDate.getDay();
    return dayNames[day];
};
