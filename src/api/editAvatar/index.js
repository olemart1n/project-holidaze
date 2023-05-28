import { url } from "../url";
export const editAvatar = (profile, imageUrl) => {
    url.put.headers.authorization = "Bearer " + profile.accessToken;
    url.put.body = JSON.stringify({ avatar: imageUrl });
    fetch(url.profile + profile.name + "/media", url.put)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
};
