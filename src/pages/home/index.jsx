import { useEffect, useState } from "react";
import styles from "../../styles/components/Home.module.css";
import { setVenues, venues, filter, setFilter } from "../../states/state-functions";
import { useFetch } from "../../features/useFetch";
import url from "../../url";

const Venues = (props) => {
    const initial = venues();
    const setInitial = setVenues();
    console.log(initial);
    return (
        <div>
            <h2>Venues</h2>
            <div>
                {initial.map(({ name, id }) => {
                    return <p key={id}>{name}</p>;
                })}
            </div>
        </div>
    );
};

const FilterInput = () => {
    const initial = filter();
    const setInitial = setFilter();
    return (
        <div>
            <input value={initial} onChange={(e) => setInitial(e.target.value)}></input>
            <div>{initial}</div>
        </div>
    );
};

function Home() {
    const { data } = useFetch("https://api.noroff.dev/api/v1/holidaze/venues");
    const setInitial = setVenues();
    useEffect(() => {
        if (data) {
            setInitial(data);
        }
    }, []);
    return (
        <div className={styles.home_div}>
            <FilterInput />
            <Venues />
        </div>
    );
}
export default Home;
