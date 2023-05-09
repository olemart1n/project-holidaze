import React from "react";
import styles from "../../styles/components/Home.module.css";
import VenueCards from "../../components/VenueCards";
import { venues, setVenues } from "../../states/state-functions";
import { useFetch } from "../../api/useFetch";
import url from "../../api/url";

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
            <VenueCards json={initial} />
        </main>
    );
}
export default Home;
