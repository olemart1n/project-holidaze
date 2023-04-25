import { useEffect } from "react";

export const useFetch = (options, setChosenState) => {
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
    }, [options]);
};
