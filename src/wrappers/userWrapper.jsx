import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
function UserWrapper() {
    return (
        <div className="user-wrapper">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
export default UserWrapper;
