import { useEffect } from "react";

export const fetchSetState = (url, options, setChosenState, optionalQuery) => {
    // setLoading(true);
    useEffect(() => {
        console.log("custom useFetch function");
        if (url) {
            let isCancelled = false;
            fetch(url, options)
                .then((response) => response.json())
                .then((json) => {
                    if (!isCancelled) {
                        json?.errors
                            ? console.log(json.errors)
                            : setChosenState(optionalQuery ? json[optionalQuery] : json);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            return () => {
                isCancelled = true;
            };
        }
        // setLoading(false);
    }, [url]);
};
