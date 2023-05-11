import { useEffect } from "react";
import { user } from "../../states/state-functions";

export const useFetch = (url) => {
    const auth = user();

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
    }, [url]);
};
