import React, { useState } from "react";
import { user, hostUser } from "../../states/state-functions";
import NavUser from "./NavUser";
import NavHost from "./NavHost";

function Header() {
    const authedHost = hostUser();
    const authed = user();
    console.log(authed);
    const [mobileNav, setMobileNav] = useState(false);
    const toggleMobileNav = () => {
        if (mobileNav) {
            setMobileNav(false);
        } else {
            setMobileNav(true);
        }
    };
    return (
        <header>
            {authed?.venueManager ? (
                <NavHost
                    toggleMobileNav={toggleMobileNav}
                    mobileNav={mobileNav}
                    user={authedHost}
                />
            ) : (
                <NavUser toggleMobileNav={toggleMobileNav} mobileNav={mobileNav} user={authed} />
            )}
        </header>
    );
}

export default Header;
