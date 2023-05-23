const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const returnMonth = (date) => {
    const jsonDate = new Date(date);
    const month = jsonDate.getMonth();
    return months[month];
};
