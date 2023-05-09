import url from "../url";
import { save } from "../../features/storage";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {},
};
export const registerUser = (data, e) => {
    e.preventDefault();
    console.log(data);
};
