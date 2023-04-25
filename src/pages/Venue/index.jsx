import styles from "../../styles/components/Venue.module.css";
import { lazy } from "react";
// import ImageSlide from "../../components/ImageSlide";
const LazyImageSlide = lazy(() => import("../../components/ImageSlide"));
import { useParams } from "react-router-dom";
import { useFetch } from "../../features/useFetch";
import { specificVenue, setSpecificVenue } from "../../states/state-functions";
import url from "../../url";

function Venue() {
    const setVenue = setSpecificVenue();
    const venue = specificVenue();
    const { id } = useParams();
    useFetch(url.venues + id + url.ownerAndBookings, setVenue);
    return !venue ? (
        <p>no venue</p>
    ) : (
        <main className={styles.venue_wrapper}>
            <h1>{venue.name}</h1>
            <LazyImageSlide data={venue} />
        </main>
    );
}

export default Venue;
