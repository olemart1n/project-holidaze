import styles from "../../styles/components/StartPage.module.css";
import VenueCards from "../../components/VenueCards";
import { venues, setVenues } from "../../states/state-functions";
import { fetchSetState, url } from "../../api";
import Search from "../../components/Search";
import { Helmet } from "react-helmet-async";

function StartPage() {
    const setInitial = setVenues();
    fetchSetState(url.venues, url.getMethod, setInitial);
    const initial = venues();
    return !initial ? (
        <div>loading</div>
    ) : (
        <main>
            <Helmet>
                <title>Holidaze | Venues</title>
                <meta name="description" content="find venues" />
            </Helmet>
            <Search />
            <h1>Venues</h1>

            <div className={styles.venue_cards_wrapper}>
                {initial.map((venue) => {
                    return <VenueCards key={venue.id} data={venue} />;
                })}
            </div>
        </main>
    );
}

export default StartPage;
