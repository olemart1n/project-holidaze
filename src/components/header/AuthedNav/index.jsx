import styles from "../../../styles/components/AuthedNav.module.css";
import { Link } from "react-router-dom";
import UserLinks from "../UserLinks";
import HostLinks from "../HostLinks";
import { MdOtherHouses } from "react-icons/md";
import { hostUser } from "../../../states/state-functions";
import { FaBars } from "react-icons/fa";

function AuthedNav({ toggleMobileNav, mobileNav, user }) {
    const authedHost = hostUser();
    return (
        <nav>
            <Link to="/profile" className={styles.logo_link}>
                <img className={styles.host_header_avatar} src={user?.avatar} />
            </Link>
            <div className={styles.host_header_links_desktop}>
                {authedHost?.name ? <HostLinks /> : <UserLinks />}
            </div>
            {mobileNav && user?.name && (
                <div className={styles.host_header_links_mobile}>
                    {user?.venueManager ? (
                        <HostLinks toggleNav={toggleMobileNav} />
                    ) : (
                        <UserLinks toggleNav={toggleMobileNav} />
                    )}
                </div>
            )}

            <button
                aria-label="toggle navigation accessibility"
                className={
                    authedHost?.name
                        ? styles.host_header_nav_button
                        : styles.host_header_nav_button_bar
                }
                onClick={toggleMobileNav}
            >
                {authedHost?.name ? <MdOtherHouses /> : <FaBars />}
            </button>
        </nav>
    );
}

export default AuthedNav;
