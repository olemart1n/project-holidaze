import { Routes, Route } from "react-router-dom";
import { setUser, setHostUser, setHostedVenues, setBookedByUser } from "./states/state-functions";
import React, { useEffect } from "react";
import Home from "./pages/home";
import Venue from "./pages/Venue";
import Profile from "./pages/Profile";
import HostVenues from "./pages/hostVenues";
import UserWrapper from "./wrappers";
import Register from "./pages/register";

import * as storage from "./features/storage";

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
            <Route path="/" element={<UserWrapper />}>
                <Route index element={<Home />} />
                <Route path="venue/:id" element={<Venue />} />
                <Route path="register" element={<Register />} />
                <Route path="host" element={<Profile />} />
                <Route path="user" element={<Profile />} />
                <Route path="host/venue" element={<HostVenues />} />
            </Route>
        </Routes>
    );
}

export default App;
