import { Outlet } from "react-router-dom";
import Header from "../header/index.jsx";
import Footer from "../footer/index.jsx";
function Wrapper() {
    return (
        <div className="wrapper">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
export default Wrapper;
