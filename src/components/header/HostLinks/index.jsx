import { Link } from "react-router-dom";
import styles from "../../../styles/header/HeaderLinks.module.css";
import { setUser, user, setHostUser, avatar } from "../../../states/state-functions";
import { useNavigate } from "react-router-dom";
function HostLinks({ toggleNav }) {
    const userAvatar = avatar();
    const navigate = useNavigate();
    const hostUser = setHostUser();
    const notHostUser = setUser();
    const logOut = () => {
        hostUser({});
        notHostUser({});
        localStorage.clear();
        setTimeout(() => {
            navigate("/");
        }, 500);
    };
    return (
        <>
            <Link className={styles.header_link} to="host/venue" onClick={toggleNav}>
                Your Venues
            </Link>
            <Link className={styles.header_link} to="/" onClick={toggleNav}>
                Find venues!
            </Link>
            <Link className={styles.header_link} to="/bookings" onClick={toggleNav}>
                Bookings
            </Link>
            <Link to="/profile" className={styles.logo_link}>
                <img className={styles.host_header_avatar} src={userAvatar} />
            </Link>

            <button className={styles.header_button} onClick={logOut}>
                Log out
            </button>
        </>
    );
}

export default HostLinks;
