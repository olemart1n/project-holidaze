import UserMadeBookings from "../../components/UserMadeBookings";
import styles from "../../styles/components/Bookings.module.css";
import { Helmet } from "react-helmet-async";

function Bookings() {
    return (
        <main>
            <Helmet>
                <title>Holidaze | Bookings</title>
                <meta name="description" content="You bookings" />
            </Helmet>
            <h1 className={styles.profile_h1}>Your bookings</h1>
            <div className={styles.profile_bookings_div}>
                <UserMadeBookings />
            </div>
        </main>
    );
}

export default Bookings;
