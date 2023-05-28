import { url } from "../url";

export const registerVenue = async (data, token, setError, setSuccess) => {
    url.post.body = JSON.stringify(data);
    url.post.headers.authorization = "Bearer " + token;
    fetch(url.venues, url.post)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                setError(data.errors[0].message);
                console.log(data.errors[0].message);
                return;
            }
            console.log(data);
            setSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        .catch((error) => console.log(error));
};
