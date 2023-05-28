import url from "../url";

export const getHostStatus = async (profile, setIsLoading) => {
    const newObject = { ...profile };
    setIsLoading(true);
    const header = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + newObject.accessToken,
        },
        body: JSON.stringify({ venueManager: true }),
    };
    fetch(url.profile + newObject.name, header)
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
