import { Outlet } from "react-router-dom";
import Header from "../Header/index";
import Footer from "../Footer";
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
