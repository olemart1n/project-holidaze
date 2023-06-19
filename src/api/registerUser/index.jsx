import { url } from "../url";
import { save } from "../../features/storage";

export const registerUser = (data, setErr, setUser, navigate) => {
    url.post.body = JSON.stringify(data);
    fetch(url.register, url.post)
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
                    navigate("/profile");
                } else {
                    navigate("/");
                }
            }, 2500);
        });
};
