import IdCard from "../../components/IdCard";
import YourBookings from "../../components/MadeBookings";
import { setHostUser } from "../../states/state-functions";
import { fetchSetState } from "../../api/fetchSetState";
import url from "../../api/url";

function Profile() {
    const setHostData = setHostUser();

    fetchSetState(url.hostData, url.getFetchHeader, setHostData);
    return (
        <main>
            <IdCard />
            <YourBookings />
        </main>
    );
}

export default Profile;
