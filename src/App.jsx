import { Routes, Route } from "react-router-dom";
import { setUser, setHostUser, setHostedVenues, setBookedByUser } from "./states/state-functions";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./components/Home";
import Venue from "./components/Venue";
import HostVenues from "./components/HostVenues";
import Bookings from "./components/Bookings";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";

import * as storage from "./features/storage";

function Header() {
    return <header>WILL THIS WORK?</header>;
}

function Wrapper() {
    return (
        <div className="wrapper">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
function App() {
    const setNoHost = setUser();
    const setHost = setHostUser();
    const setHostVenues = setHostedVenues();
    const setBookedUserVenues = setBookedByUser();
    useEffect(() => {
        storage.load("bookedByUser") && setBookedUserVenues(storage.load("bookedByUser"));
        storage.load("user") && setNoHost(storage.load("user"));
        storage.load("hostUser") && setHost(storage.load("hostUser"));
        storage.load("hostedVenues") && setHostVenues(storage.load("hostedVenues"));
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Wrapper />}>
                <Route index element={<Home />} />
                <Route path="venue/:id" element={<Venue />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="host/venue" element={<HostVenues />} />
            </Route>
        </Routes>
    );
}

export default App;
