import url from "../url";
import { closeDialog } from "../../features/dialogs";
import { save } from "../../features/storage";
import { fetchSetState } from "../fetchSetState";
import ifHostSetVenues from "../setHostedVenues";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {},
};
export const login = async (data, setErr, setSuccess, setUser, setHostUser, setHostVenues) => {
    let host = false;
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
                ifHostSetVenues(data.name, data.accessToken, setHostVenues, "venues");
            } else {
                save("user", data);
                setUser(data);
                //set hosted venues state
            }
            setSuccess(true);
            setTimeout(() => {
                // closeDialog();
            }, 1500);
        })
        .catch((error) => console.log(error));
};
