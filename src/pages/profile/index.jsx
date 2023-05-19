import { useEffect, useState } from "react";
import { fetchSetState } from "../../api/fetchSetState";
import IdCard from "../../components/IdCard";
import YourBookings from "../../components/MadeBookings";
import { setHostedVenues } from "../../states/state-functions";
import url from "../../api/url";
import { load } from "../../features/storage";

function Profile() {
    const setVenues = setHostedVenues();
    fetchSetState(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${
            load("hostUser").name
        }?_bookings=true&_venues=true`,
        url.getFetchHeader,
        setVenues,
        "venues"
    );
    return (
        <main>
            <IdCard />
            <YourBookings />
        </main>
    );
}

export default Profile;
