import url from "../url";
import { save } from "../../features/storage";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {},
};
export const registerUser = (data, setErr, setUser, navigate) => {
    header.body = JSON.stringify(data);
    fetch(url.register, header)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                setErr(data.errors[0].message);
                setTimeout(() => {
                    setErr("");
                }, 3000);
                return;
            }
            setUser(data);
            save("user", data);
        })
        .finally(() => {
            setTimeout(() => {
                if (data.venueManager) {
                    navigate("/host");
                } else {
                    navigate("/");
                }
            }, 2500);
        });
};
