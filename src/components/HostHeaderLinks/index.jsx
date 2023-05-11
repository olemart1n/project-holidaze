import { Link } from "react-router-dom";
import styles from "../../styles/components/HostHeaderLinks.module.css";

function HostHeaderLinks() {
    return (
        <>
            <Link className={styles.host_header_link} to="venue">
                Your Venue
            </Link>
            <Link className={styles.host_header_link} to="/">
                Bookings
            </Link>
            <Link className={styles.host_header_link} to="/host">
                Find venues!
            </Link>
            <button className={styles.host_header_button}>Log out</button>
        </>
    );
}

export default HostHeaderLinks;