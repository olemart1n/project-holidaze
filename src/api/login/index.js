import url from "../url";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {},
};
export const login = async (data) => {
    const { email, password } = data;
    header.body = JSON.stringify({ email, password });
    header.body = fetch(url.login, header)
        .then((data) => data.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
};
