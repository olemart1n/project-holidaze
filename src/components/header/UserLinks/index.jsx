import { Link } from "react-router-dom";
import styles from "../../../styles/components/UserLinks.module.css";
import { setUser, user, avatar } from "../../../states/state-functions";
import { useNavigate } from "react-router-dom";
function UserLinks({ toggleNav }) {
    const userAvatar = avatar();
    const navigate = useNavigate();
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
            <Link to="/profile" className={styles.logo_link}>
                <img className={styles.host_header_avatar} src={userAvatar} />
            </Link>
            <button className={styles.header_button} onClick={logOut}>
                Log out
            </button>
        </>
    );
}

export default UserLinks;
