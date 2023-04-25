import { useEffect } from "react";
import { isLoading, setIsLoading } from "../states/state-functions";

export const useFetch = (options, setChosenState) => {
    setIsLoading(true);
    useEffect(() => {
        console.log("custom useFetch function");
        if (options) {
            let isCancelled = false;
            fetch(options)
                .then((response) => response.json())
                .then((json) => {
                    if (!isCancelled) {
                        setChosenState(json);
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
