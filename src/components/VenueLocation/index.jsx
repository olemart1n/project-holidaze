import styles from "../../styles/components/VenueLocation.module.css";
import { FaLocationArrow } from "react-icons/fa";
function VenueLocation({ location }) {
    const ref = { ...location };

    return (
        <div className={styles.venue_location_div}>
            <div className={styles.venue_location_div_text}>
                <h3>{ref.city}</h3>
                <h4 className={styles.venue_location_div_continent}>
                    {ref.country}, {ref.continent}
                </h4>
            </div>
            <div className={styles.venue_location_div_map}>
                <FaLocationArrow className={styles.venue_location_div_icon} />
            </div>
        </div>
    );
}

export default VenueLocation;
