import UserMadeBookings from "../../components/UserMadeBookings";
import styles from "../../styles/components/Bookings.module.css";

function Bookings() {
    return (
        <main>
            <h1 className={styles.profile_h1}>Your bookings</h1>
            <div className={styles.profile_bookings_div}>
                <UserMadeBookings />
            </div>
        </main>
    );
}

export default Bookings;
