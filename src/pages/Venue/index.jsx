import styles from "../../styles/components/Venue.module.css";
import { useNavigate } from "react-router-dom";
import ImageSlide from "../../components/ImageSlide";
import Book from "../../components/Book";
import VenueDescription from "../../components/VenueDescription";
import VenueMeta from "../../components/VenueMeta";
import VenueLocation from "../../components/VenueLocation";
import { useParams } from "react-router-dom";
import { useFetch } from "../../api/useFetch";
import { specificVenue, setSpecificVenue } from "../../states/state-functions";
import { BiArrowBack } from "react-icons/bi";
import url from "../../api/url";

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
            <div className={styles.big_screen_info}>
                <Book />
                <div className={styles.info_layout}>
                    <VenueMeta info={venue} />
                    <VenueLocation location={venue.location} />
                </div>
            </div>
            <VenueDescription description={venue.description} />
        </main>
    );
}

export default Venue;
