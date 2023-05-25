import IdCard from "../../components/IdCard";
import UserMadeBookings from "../../components/UserMadeBookings";
import styles from "../../styles/components/Profile.module.css";

function Profile() {
    const hello = 1;
    return (
        <main>
            <h1>Your bookings</h1>
            <div className={styles.profile_id_div}>
                <IdCard />
            </div>

            <UserMadeBookings />
        </main>
    );
}

export default Profile;
