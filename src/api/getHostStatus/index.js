import { url } from "../url";

export const getHostStatus = async (profile, setIsLoading) => {
    const newObject = { ...profile };
    setIsLoading(true);
    url.put.headers.authorization = "Bearer " + newObject.accessToken;
    url.put.body = JSON.stringify({ venueManager: true });
    fetch(url.profile + newObject.name, url.put)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
                return;
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));
};
