import styles from "../../styles/components/Header.module.css";
import { BsPerson } from "react-icons/bs";
import { user } from "../../states/state-functions";
import { FaBars } from "react-icons/fa";
import { openDialog } from "../../features/dialogs";
function HeaderPersonIcon() {
    const loggedInUser = user();
    return loggedInUser?.name ? (
        <button className={styles.header_nav_icon_button}>
            <FaBars className={styles.header_nav_icon_bar} />
        </button>
    ) : (
        <button onClick={openDialog} className={styles.header_nav_icon_button}>
            <BsPerson className={styles.header_nav_icon} />
        </button>
    );
}

export default HeaderPersonIcon;
