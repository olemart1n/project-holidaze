import styles from "../../styles/components/Venue.module.css";
import { lazy } from "react";
import ImageSlide from "../../components/ImageSlide";
import Book from "../../components/Book";
import VenueMeta from "../../components/VenueMeta";
import VenueDescription from "../../components/VenueDescription";
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
            <h1 className={styles.venue_heading}>{venue.name}</h1>
            <ImageSlide data={venue} />
            <Book />

            <VenueMeta meta={venue.meta} />
            <VenueDescription description={venue.description} />
        </main>
    );
}

export default Venue;
