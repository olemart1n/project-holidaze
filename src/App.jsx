import { Routes, Route } from "react-router-dom";
import { setUser, setHostUser } from "./states/state-functions";
import React, { useEffect } from "react";
import Home from "./pages/home";
import Venue from "./pages/Venue";
import Profile from "./pages/profile";
import HostVenue from "./pages/hostVenue";
import UserWrapper from "./wrappers";
import Register from "./pages/register";

import * as storage from "./features/storage";

function App() {
    const setNoHost = setUser();
    const setHost = setHostUser();
    useEffect(() => {
        storage.load("user") && setNoHost(storage.load("user"));
        storage.load("hostUser") && setHost(storage.load("hostUser"));
    }, []);

    return (
        <Routes>
            <Route path="/" element={<UserWrapper />}>
                <Route index element={<Home />} />
                <Route path="venue/:id" element={<Venue />} />
                <Route path="register" element={<Register />} />
                <Route path="host" element={<Profile />} />
                <Route path="host/venue" element={<HostVenue />} />
            </Route>
        </Routes>
    );
}

export default App;
