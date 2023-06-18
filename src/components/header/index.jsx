import React, { useState } from "react";
import { user, hostUser, isLoading } from "../../states/state-functions";
import GuestNav from "./guestNav";
import AuthedNav from "./authedNav";

function Header() {
    const authedHost = hostUser();
    const authed = user();
    const loading = isLoading();
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
            {(authedHost?.venueManager || authed?.name) && !loading ? (
                <AuthedNav
                    toggleMobileNav={toggleMobileNav}
                    mobileNav={mobileNav}
                    user={authedHost?.avatar ? authedHost : authed}
                />
            ) : (
                <GuestNav />
            )}
        </header>
    );
}

export default Header;
