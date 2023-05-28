import { useEffect } from "react";

export const fetchSetState = (url, options, setChosenState, optionalQuery) => {
    useEffect(() => {
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
    }, [url]);
};
