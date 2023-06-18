import styles from "../../styles/pages/Venue.module.css";
import { useNavigate } from "react-router-dom";
import ImageSlide from "../../components/ImageSlide";
import Book from "../../components/Book";
import VenueDescription from "../../components/VenueDescription";
import VenueMeta from "../../components/VenueMeta";
import VenueMap from "../../components/VenueMap";
import { useParams } from "react-router-dom";
import { fetchSetState, url } from "../../api";
import { specificVenue, setSpecificVenue } from "../../states/state-functions";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet-async";

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
            <Helmet>
                <title>{venue.name}</title>
                <meta name="description" content={venue.description} />
            </Helmet>
            <BiArrowBack onClick={() => navigate(-1)} className={styles.back_arrow} />

            <h1 className={styles.venue_heading}>{venue.name}</h1>
            <div className={styles.venue_imageSlide}>
                <ImageSlide data={venue} />
            </div>
            <div className={styles.big_screen_info}>
                <Book />
                <div className={styles.info_layout}>
                    <VenueMeta info={venue.meta} />
                    <VenueDescription description={venue.description} />
                </div>
            </div>
            <VenueMap location={venue.location} />
        </main>
    );
}

export default Venue;
