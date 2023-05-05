import React from "react";
import styles from "../../styles/components/Home.module.css";
import VenueCards from "../../components/VenueCards";
import { filter, setFilter, venues, setVenues } from "../../states/state-functions";
import { useFetch } from "../../api/useFetch";
import url from "../../api/url";

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
    const setInitial = setVenues();
    useFetch(url.venues, setInitial);
    const initial = venues();
    // VenueCards is displaying the initial state, instead of state provided by the fetch function!!
    return !initial ? (
        <div>loading</div>
    ) : (
        <main className={styles.home_div}>
            <h1>Venues</h1>
            <FilterInput />
            <VenueCards json={initial} />
        </main>
    );
}
export default Home;
