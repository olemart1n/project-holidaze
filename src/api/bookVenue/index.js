import url from "../url";

const bookVenue = async (data, setFalseState) => {
    const header = url.postMethod;
    header.body = JSON.stringify(data);
    fetch(url.bookings, header)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
                return;
            }
            console.log(data);
            setFalseState(false);
        })
        .catch((error) => {
            console.log(error);
        });
};

export default bookVenue;
