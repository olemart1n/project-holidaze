import styles from "../../../styles/components/NavUser.module.css";
import { BsPerson } from "react-icons/bs";
import { user } from "../../../states/state-functions";
import { FaBars } from "react-icons/fa";
import { openDialog } from "../../../features/dialogs";
function HeaderPersonIcon() {
    const loggedInUser = user();
    return loggedInUser?.name ? (
        <button className={styles.userNav_auth}>
            <BsPerson className={styles.header_nav_icon} />
        </button>
    ) : (
        <button onClick={openDialog} className={styles.userNav_auth}>
            {/* <BsPerson className={styles.header_nav_icon} /> */}
            <p className={styles.header_nav_login}>Login</p>
        </button>
    );
}

export default HeaderPersonIcon;
