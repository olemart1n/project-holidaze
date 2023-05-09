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
export const login = async (data, setErr, setUser) => {
    header.body = JSON.stringify(data);
    header.body = fetch(url.login, header)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                setErr(data.errors[0].message);
                return;
            }
            setUser(data);
            save("user", data);
            console.log("hello");
            setTimeout(() => {
                closeDialog();
            }, 1500);
        })
        .catch((error) => console.log(error));
};
