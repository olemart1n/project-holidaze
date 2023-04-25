import styles from "../../styles/components/Venue.module.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../features/useFetch";
import { specificVenue, setSpecificVenue } from "../../states/state-functions";
import url from "../../url";

function Venue() {
    const setVenue = setSpecificVenue();
    const venue = specificVenue();
    const { id } = useParams();
    useFetch(url.venues + id + url.ownerAndBookings, setVenue);
    console.log(id);
    return !venue ? (
        <div>loading</div>
    ) : (
        <main className={styles.venue_wrapper}>
            <h1>{venue.name}</h1>
        </main>
    );
}

export default Venue;
