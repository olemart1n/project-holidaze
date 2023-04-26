import { Routes, Route } from "react-router-dom";
import React from "react";
import { setVenues } from "./states/state-functions";
import { useFetch } from "./features/useFetch";
import url from "./url";
import Home from "./pages/home";
import Venue from "./pages/Venue";
import UserWrapper from "./wrappers/UserWrapper";
const LazyHostWrapper = React.lazy(() => import("./wrappers/HostWrapper"));

function App() {
    const setInitial = setVenues();
    useFetch(url.venues, setInitial);
    return (
        <Routes>
            <Route path="/" element={<UserWrapper />}>
                <Route index element={<Home />} />
                <Route path="venue/:id" index element={<Venue />} />
            </Route>
            <Route path="host" element={<LazyHostWrapper />}>
                <Route index element={<Home />} />
                <Route path="test" element={<div>helllllo</div>} />
            </Route>
        </Routes>
    );
}

export default App;
