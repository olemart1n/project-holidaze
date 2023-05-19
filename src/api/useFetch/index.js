import { useEffect } from "react";
import { user, hostUser } from "../../states/state-functions";

export const useFetch = (url, options) => {
    const x = user();
    const y = hostUser();
    let auth;
    x.name ? (auth = x) : (auth = y);
    useEffect(() => {
        console.log("fetch function");
        if (url) {
            let isCancelled = false;
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (!isCancelled) {
                        console.log(json);
                        return json;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            return () => {
                isCancelled = true;
            };
        }
        return data;
    }, [url, options]);
};
