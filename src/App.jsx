import { Routes, Route } from "react-router-dom";
import {
    setUser,
    setHostUser,
    setHostedVenues,
    setBookedByUser,
    setAvatar,
} from "./states/state-functions";
import React, { useEffect } from "react";
import StartPage from "./pages/StartPage";
import Venue from "./pages/Venue";
import HostVenues from "./pages/HostVenues";
import Bookings from "./pages/Bookings";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import * as storage from "./features/storage";
import Wrapper from "./components/Wrapper";
function App() {
    const setUserAvatar = setAvatar();
    const setNoHost = setUser();
    const setHost = setHostUser();
    const setHostVenues = setHostedVenues();
    const setBookedUserVenues = setBookedByUser();
    useEffect(() => {
        storage.load("bookedByUser") && setBookedUserVenues(storage.load("bookedByUser"));
        storage.load("user") && setNoHost(storage.load("user"));
        storage.load("hostUser") && setHost(storage.load("hostUser"));
        storage.load("hostedVenues") && setHostVenues(storage.load("hostedVenues"));
        storage.load("avatar") && setUserAvatar(storage.load("avatar"));
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Wrapper />}>
                <Route index element={<StartPage />} />
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
