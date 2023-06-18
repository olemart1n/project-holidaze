import styles from "../../../styles/header/AuthedNav.module.css";
import UserLinks from "../UserLinks";
import HostLinks from "../HostLinks";
import { hostUser } from "../../../states/state-functions";
import { FaBars } from "react-icons/fa";
import HolidazeLogo from "../HolidazeLogo";

function AuthedNav({ toggleMobileNav, mobileNav, user }) {
    const authedHost = hostUser();
    return (
        <nav>
            <HolidazeLogo />
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
                className={styles.host_header_nav_button_bar}
                onClick={toggleMobileNav}
            >
                <FaBars className={styles.host_header_bar} />
            </button>
        </nav>
    );
}

export default AuthedNav;
