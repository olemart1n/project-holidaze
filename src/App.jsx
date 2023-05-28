import { Routes, Route } from "react-router-dom";
import { setUser, setHostUser, setHostedVenues, setBookedByUser } from "./states/state-functions";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import Venue from "./pages/Venue";
import HostVenues from "./pages/HostVenues";
import Bookings from "./pages/Bookings";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import * as storage from "./features/storage";
import Wrapper from "./components/wrapper";
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
