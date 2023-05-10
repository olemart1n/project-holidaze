import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HostHeader from "../../components/HostHeader";
function HostWrapper() {
    return (
        <div className="host-wrapper">
            <HostHeader />
            <Outlet />
            <Footer />
        </div>
    );
}
export default HostWrapper;
