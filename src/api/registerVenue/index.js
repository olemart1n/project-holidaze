import url from "../url";
import { closeDialog } from "../../features/dialogs";
import { save } from "../../features/storage";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {},
};
export const registerVenue = async (data) => {
    header.body = JSON.stringify(data);
    fetch(url.login, header)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                setErr(data.errors[0].message);
                return;
            }
            if (data.venueManager) {
                save("hostUser", data);
                setHostUser(data);
            } else {
                save("user", data);
                setUser(data);
            }
            setSuccess(true);
            setTimeout(() => {
                closeDialog();
            }, 1500);
        })
        .catch((error) => console.log(error));
};
