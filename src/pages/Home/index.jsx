import React from "react";
import styles from "../../styles/components/Home.module.css";
import VenueCards from "../../components/VenueCards";
import { venues, setVenues } from "../../states/state-functions";
import { fetchSetState, url } from "../../api";

function Home() {
    const setInitial = setVenues();
    fetchSetState(url.venues, url.getMethod, setInitial);
    const initial = venues();
    // VenueCards is displaying the initial state, instead of state provided by the fetch function!!
    return !initial ? (
        <div>loading</div>
    ) : (
        <main className={styles.home_div}>
            <h1>Venues</h1>

            <div className={styles.venue_cards_wrapper}>
                {initial.map((venue) => {
                    return <VenueCards key={venue.id} data={venue} />;
                })}
            </div>
        </main>
    );
}
export default Home;
