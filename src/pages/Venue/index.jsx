import styles from "../../styles/components/Venue.module.css";
import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageSlide from "../../components/ImageSlide";
import Book from "../../components/Book";
import VenueDescription from "../../components/VenueDescription";
import VenueInfo from "../../components/VenuePrice";
import { useParams } from "react-router-dom";
import { useFetch } from "../../features/useFetch";
import { specificVenue, setSpecificVenue } from "../../states/state-functions";
import { BiArrowBack } from "react-icons/bi";

import url from "../../url";

function Venue() {
    const navigate = useNavigate();
    const setVenue = setSpecificVenue();
    const venue = specificVenue();
    const { id } = useParams();
    useFetch(url.venues + id + url.ownerAndBookings, setVenue);
    return !venue ? (
        <p>no venue</p>
    ) : (
        <main className={styles.venue_wrapper}>
            <BiArrowBack onClick={() => navigate(-1)} className={styles.back_arrow} />

            <h1 className={styles.venue_heading}>{venue.name}</h1>
            <ImageSlide data={venue} />
            <Book />
            <VenueInfo info={venue} />
            <VenueDescription description={venue.description} />
        </main>
    );
}

export default Venue;
