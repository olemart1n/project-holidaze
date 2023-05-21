import { Link } from "react-router-dom";
import styles from "../../../styles/components/HostLinks.module.css";
import { setUser, user, setHostUser } from "../../../states/state-functions";
import { remove } from "../../../features/storage";
import { useNavigate } from "react-router-dom";

function HostLinks({ toggleNav }) {
    const navigate = useNavigate();
    const hostUser = setHostUser();
    const notHostUser = setUser();
    const logOut = () => {
        hostUser({});
        notHostUser({});
        localStorage.clear();
        setTimeout(() => {
            navigate("/");
            document.location.reload();
        }, 500);
    };
    return (
        <>
            <Link className={styles.header_link} to="host/venue" onClick={toggleNav}>
                Your Venues
            </Link>
            <Link className={styles.header_link} to="/host/bookings" onClick={toggleNav}>
                Bookings
            </Link>
            <Link className={styles.header_link} to="/" onClick={toggleNav}>
                Find venues!
            </Link>
            <Link className={styles.header_link} to="/host" onClick={toggleNav}>
                Profile
            </Link>
            <button className={styles.header_button} onClick={logOut}>
                Log out
            </button>
        </>
    );
}

export default HostLinks;
