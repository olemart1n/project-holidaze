import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
function HostWrapper() {
    return (
        <div className="host-wrapper">
            <Outlet />
            HELLLLLLO
            <Footer />
        </div>
    );
}
export default HostWrapper;
