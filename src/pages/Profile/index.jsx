import IdCard from "../../components/IdCard";
import UserMadeBookings from "../../components/UserMadeBookings";
import styles from "../../styles/components/Profile.module.css";

function Profile() {
    return (
        <main>
            <h1>Your bookings</h1>
            <div className={styles.profile_id_div}>
                <IdCard />
            </div>
            <div className={styles.profile_bookings_div}>
                <UserMadeBookings />
            </div>
        </main>
    );
}

export default Profile;
