import IdCard from "../../components/IdCard";
import YourBookings from "../../components/MadeBookings";
import { setHostUser, user } from "../../states/state-functions";
import { fetchSetState } from "../../api/fetchSetState";
function Profile() {
    const host = user();
    const setHostData = setHostUser();
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${host.accessToken}`,
        },
    };
    fetchSetState(
        `https://api.noroff.dev/api/v1/holidaze/profiles/Brousard?_bookings=true&_venues=true`,
        setHostData
    );

    return (
        <main>
            <IdCard />
            <YourBookings />
        </main>
    );
}

export default Profile;
