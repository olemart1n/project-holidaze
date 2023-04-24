import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import wrapper from "./wrappers";

function App() {
    const { UserWrapper, HostWrapper } = wrapper;
    return (
        <Routes>
            <Route path="/" element={<UserWrapper />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="host" element={<HostWrapper />}>
                <Route index element={<Home />} />
                <Route path="test" element={<div>helllllo</div>} />
            </Route>
        </Routes>
    );
}

export default App;
