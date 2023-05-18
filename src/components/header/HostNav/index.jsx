import HostLinks from "../HostLinks";
import HeaderPersonIcon from "../HeaderPersonIcon";
import { MdOtherHouses } from "react-icons/md";

function NavHost({ mobileNav }) {
    return (
        <>
            <nav className={styles.host_header_nav}>
                <Link to="/host" className={styles.logo_link}>
                    <img className={styles.host_header_avatar} src={loggedInUser.avatar} />
                </Link>
                <div className={styles.host_header_links_desktop}>
                    <HostLinks />
                </div>
                {mobileNav && (
                    <div className={styles.host_header_links_mobile}>
                        <HostLinks />
                    </div>
                )}
            </nav>
            <button
                aria-label="toggle navigation accessibility"
                className={styles.host_header_nav_button}
                onClick={toggleMobileNav}
            >
                <MdOtherHouses />
            </button>
        </>
    );
}

export default NavHost;
{
    /* <HeaderPersonIcon /> */
}
