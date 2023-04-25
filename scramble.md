the initital user fetc function taken from jack herrintion tutorial

```js
import { useState, useEffect } from "react";

export const useFetch = (options) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log("custom useFetch function");
        if (options) {
            let isCancelled = false;
            fetch(options)
                .then((response) => response.json())
                .then((json) => {
                    if (!isCancelled) {
                        setData(json);
                    }
                });
            return () => {
                isCancelled = true;
            };
        }
    }, [options]);

    return {
        data,
    };
};
```

from the old Home component

```js
const { data } = useFetch(url.venues);
const setInitial = setVenues();
useEffect(() => {
    setInitial(data);
}, [data]);
return !data ? (
    <div>loading</div>
) : (
    <div className={styles.home_div}>
        <h1>Venues</h1>
        <FilterInput />
        <VenueCard json={data} />
    </div>
);
```
