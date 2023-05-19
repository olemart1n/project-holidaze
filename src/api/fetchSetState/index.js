import { useEffect } from "react";
import { setIsLoading, setError } from "../../states/state-functions";

export const fetchSetState = (url, options, setChosenState, optionalQuery) => {
    const setErrorState = setError();
    const setLoading = setIsLoading();
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
                            ? setErrorState(json.errors) & console.log(json.errors)
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
