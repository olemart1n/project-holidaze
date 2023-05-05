import url from "../url";

export const login = async (data) => {
    const payload = JSON.stringify(data);
    const request = await fetch(url.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { payload },
    });
    const response = await request.json();
    console.log(response);
    return response;
};
