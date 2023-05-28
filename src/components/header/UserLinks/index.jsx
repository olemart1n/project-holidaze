import { Link } from "react-router-dom";
import styles from "../../../styles/components/UserLinks.module.css";
import { setUser, user } from "../../../states/state-functions";
import { useNavigate } from "react-router-dom";
function UserLinks({ toggleNav }) {
    const navigate = useNavigate();
    const userState = user();
    const setUserState = setUser();
    const logOut = () => {
        setUserState({});
        localStorage.clear();
        setTimeout(() => {
            navigate("/");
        }, 500);
    };
    return (
        <>
            <Link className={styles.user_link} to="/" onClick={toggleNav}>
                Find venues
            </Link>
            <Link className={styles.user_link} to="/bookings" onClick={toggleNav}>
                Bookings
            </Link>
            <button className={styles.header_button} onClick={logOut}>
                Log out
            </button>
        </>
    );
}

export default UserLinks;
