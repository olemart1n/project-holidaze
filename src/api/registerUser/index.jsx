import url from "../url";
import { save } from "../../features/storage";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {},
};
export const registerUser = (data, setErr, setUser) => {
    header.body = JSON.stringify(data);
    fetch(url.register, header)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                setErr(data.errors[0].message);
                return;
            }
            setUser(data);
            save("user", data);
            setTimeout(() => {
                console.log("redirect to another page");
            }, 1500);
        });
};
