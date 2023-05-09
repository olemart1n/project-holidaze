import { Routes, Route } from "react-router-dom";
import { setUser, user } from "./states/state-functions";
import React, { useEffect } from "react";
import Home from "./pages/home";
import Venue from "./pages/Venue";
import UserWrapper from "./wrappers/UserWrapper";
import Register from "./pages/register";
const LazyHostWrapper = React.lazy(() => import("./wrappers/HostWrapper"));
import * as storage from "./features/storage";

function App() {
    const setLoggedInUser = setUser();
    useEffect(() => {
        if (storage.load("user")) {
            setLoggedInUser(storage.load("user"));
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<UserWrapper />}>
                <Route index element={<Home />} />
                <Route path="venue/:id" index element={<Venue />} />
                <Route path="register" index element={<Register />} />
            </Route>
            <Route path="host" element={<LazyHostWrapper />}>
                <Route index element={<Home />} />
                <Route path="test" element={<div>helllllo</div>} />
            </Route>
        </Routes>
    );
}

export default App;
