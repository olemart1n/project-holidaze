import React from "react";
import HeaderPersonIcon from "../HeaderPersonIcon";
import { MdOtherHouses } from "react-icons/md";
import HostHeaderLinks from "../HostHeaderLinks";
import { user } from "../../states/state-functions";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/components/HostHeader.module.css";

function HostHeader() {
    const loggedInUser = user();
    const [mobileNav, setIsMobileNav] = useState(false);
    const toggleMobileNav = () => {
        if (mobileNav) {
            setIsMobileNav(false);
        } else {
            setIsMobileNav(true);
        }
    };
    return (
        <header className={styles.host_header}>
            <nav className={styles.host_header_nav}>
                <Link to="/host" className={styles.logo_link}>
                    <img className={styles.host_header_avatar} src={loggedInUser.avatar} />
                </Link>
                <div className={styles.host_header_links_desktop}>
                    <HostHeaderLinks />
                </div>
                {mobileNav && (
                    <div className={styles.host_header_links_mobile}>
                        <HostHeaderLinks />
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
            {/* <HeaderPersonIcon /> */}
        </header>
    );
}

export default HostHeader;
