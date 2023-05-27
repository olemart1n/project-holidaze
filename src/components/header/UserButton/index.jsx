import styles from "../../../styles/components/UserButton.module.css";
import { FaBars } from "react-icons/fa";
import { user } from "../../../states/state-functions";
import { openDialog } from "../../../features/dialogs";
function UserButton({ toggleMobileNav }) {
    const loggedInUser = user();
    return loggedInUser?.name ? (
        <button className={styles.userNav_auth} onClick={toggleMobileNav}>
            <FaBars className={styles.header_nav_icon} />
        </button>
    ) : (
        <button onClick={() => openDialog("login")} className={styles.userNav_auth}>
            <p className={styles.header_nav_login}>Login</p>
        </button>
    );
}

export default UserButton;
