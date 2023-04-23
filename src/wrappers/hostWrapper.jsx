import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
function HostWrapper() {
    return (
        <div className="host-wrapper">
            <Outlet />
            <Footer />
        </div>
    );
}
export default HostWrapper;
