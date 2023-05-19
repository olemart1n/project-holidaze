import url from "../url";
import { closeDialog } from "../../features/dialogs";
import { save } from "../../features/storage";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        authorization: "",
    },
    body: {},
};
export const registerVenue = async (data, token, setError, setSuccess) => {
    header.body = JSON.stringify(data);
    header.headers.authorization = "Bearer " + token;
    fetch(url.venues, header)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                setError(data.errors[0].message);
                console.log(data.errors[0].message);
                return;
            }
            console.log(data);
            setSuccess(true);
        })
        .catch((error) => console.log(error));
};
