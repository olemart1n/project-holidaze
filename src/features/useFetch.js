// import { useState, useEffect } from "react";

// export const useFetch = (options) => {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         console.log("custom useFetch function");
//         if (options) {
//             let isCancelled = false;
//             fetch(options)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     if (!isCancelled) {
//                         setData(json);
//                     }
//                 });
//             return () => {
//                 isCancelled = true;
//             };
//         }
//     }, [options]);

//     return {
//         data,
//     };
// };
import { useState, useEffect } from "react";

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
                });
            return () => {
                isCancelled = true;
            };
        }
    }, [options]);
};
