import styles from "../../../styles/components/NavHost.module.css";
import { Link } from "react-router-dom";
import HostHeaderLinks from "../HostLinks";
import { MdOtherHouses } from "react-icons/md";

function NavHost({ toggleMobileNav, mobileNav, user }) {
    return (
        <nav>
            <Link to="/host" className={styles.logo_link}>
                <img className={styles.host_header_avatar} src={user?.avatar} />
            </Link>
            <div className={styles.host_header_links_desktop}>
                <HostHeaderLinks />
            </div>
            {mobileNav && (
                <div className={styles.host_header_links_mobile}>
                    <HostHeaderLinks toggleNav={toggleMobileNav} />
                </div>
            )}

            <button
                aria-label="toggle navigation accessibility"
                className={styles.host_header_nav_button}
                onClick={toggleMobileNav}
            >
                <MdOtherHouses />
            </button>
        </nav>
    );
}

export default NavHost;
