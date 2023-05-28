import { url } from "../url";

export const bookVenue = async (data, setFalseState, token) => {
    url.post.headers.authorization = "Bearer " + token;
    url.post.body = JSON.stringify(data);

    fetch(url.bookings, url.post)
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
