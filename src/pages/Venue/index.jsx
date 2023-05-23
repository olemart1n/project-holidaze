import styles from "../../styles/components/Venue.module.css";
import { useNavigate } from "react-router-dom";
import ImageSlide from "../../components/ImageSlide";
import Book from "../../components/Book";
import VenueDescription from "../../components/VenueDescription";
import VenueMeta from "../../components/VenueMeta";
import VenueLocation from "../../components/VenueLocation";
import { useParams } from "react-router-dom";
import { fetchSetState } from "../../api/fetchSetState";
import { specificVenue, setSpecificVenue } from "../../states/state-functions";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../components/Loader";
import url from "../../api/url";
import { useEffect } from "react";

function Venue() {
    const navigate = useNavigate();
    const setVenue = setSpecificVenue();
    const venue = specificVenue();
    const { id } = useParams();
    fetchSetState(url.venues + id + url.ownerAndBookings, url.getMethod, setVenue);
    return !(venue.id === id) ? (
        <main className={styles.venue_wrapper_deleted}>
            <BiArrowBack onClick={() => navigate(-1)} className={styles.back_arrow} />
            <Loader />
        </main>
    ) : (
        <main className={styles.venue_wrapper}>
            <BiArrowBack onClick={() => navigate(-1)} className={styles.back_arrow} />

            <h1 className={styles.venue_heading}>{venue.name}</h1>
            <div className={styles.venue_imageSlide}>
                <ImageSlide data={venue} />
            </div>
            <div className={styles.big_screen_info}>
                <Book />
                <div className={styles.info_layout}>
                    <VenueMeta info={venue.meta} />
                    <VenueLocation location={venue.location} />
                </div>
            </div>
            <VenueDescription description={venue.description} />
        </main>
    );
}

export default Venue;
