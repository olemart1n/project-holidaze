import styles from "../../styles/components/UserMadeBookings.module.css";
import Loader from "../Loader";
import ImageSlide from "../ImageSlide";
import VenueMeta from "../VenueMeta";
import { bookedByUser, setBookedByUser } from "../../states/state-functions";
import { timeGap, returnDate, returnDay, returnMonth } from "../../features/dateAndTime/index";
import { Link } from "react-router-dom";
import { cancelBooking } from "../../api/cancelBooking";
function UserMadeBookings() {
    const bookings = bookedByUser();
    const setBookings = setBookedByUser();
    const now = new Date();

    return bookings[0]?.guests ? (
        <div className={styles.madeBookings_h1}>
            <h1>Your Bookings</h1>
            <div className={styles.madeBookings}>
                {bookings.map((booking) => (
                    <div key={booking.id} className={styles.madeBookings_container}>
                        <div className={styles.madeBookings_container_top}>
                            <h3>{booking.venue.name}</h3>
                            <p className={styles.madeBookings_container_top_startAndEnd}>
                                {returnDate(booking.dateFrom)} {returnMonth(booking.dateFrom)} /
                                {returnDate(booking.dateTo)} {returnMonth(booking.dateTo)}
                            </p>
                        </div>
                        <div className={styles.madeBookings_imageContainer}>
                            <ImageSlide data={booking.venue} />
                        </div>
                        {timeGap(now, booking.dateTo) > 0 ? (
                            <div className={styles.madeBookings_priceDiv}>
                                <p>Booked for {booking.guests} persons</p>
                                <h4>{timeGap(booking.dateFrom, booking.dateTo)} Nights</h4>
                                <h3>
                                    Price{" "}
                                    {booking.venue.price *
                                        timeGap(booking.dateFrom, booking.dateTo)}
                                    ,-
                                </h3>
                            </div>
                        ) : (
                            <div className={styles.madeBookings_priceDiv}>
                                <Link>Book again</Link>
                            </div>
                        )}

                        <div className={styles.madeBookings_meta}>
                            <VenueMeta info={booking.venue?.meta} />
                        </div>
                        {timeGap(now, booking.dateTo) > 0 ? (
                            <button
                                className={styles.madeBookings_cancel}
                                onClick={() => cancelBooking(bookings, booking.id, setBookings)}
                            >
                                Cancel booking
                            </button>
                        ) : (
                            ""
                        )}
                        <Link
                            to={`/venue/${booking.venue.id}`}
                            className={styles.madeBookings_link}
                        >
                            View venue
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div>
            <h1> Looks like you should book a venue !</h1>
            <Loader />
        </div>
    );
}

export default UserMadeBookings;
