import { useEffect } from "react";
import { setIsLoading, setError } from "../../states/state-functions";

export const fetchSetState = (options, setChosenState) => {
    const setErrorState = setError();
    setIsLoading(true);
    useEffect(() => {
        console.log("custom useFetch function");
        if (options) {
            let isCancelled = false;
            fetch(options)
                .then((response) => response.json())
                .then((json) => {
                    if (!isCancelled) {
                        json?.errors ? setErrorState(json.errors) : setChosenState(json);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            return () => {
                isCancelled = true;
            };
        }
        setIsLoading(false);
    }, [options]);
};
