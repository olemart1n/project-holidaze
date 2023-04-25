import styles from "../../styles/components/Book.module.css";
import { GoCalendar } from "react-icons/go";

function Book() {
    return (
        <div className={styles.booking_container} onClick={() => console.log("hello")}>
            <p>Book this venue</p>
            <GoCalendar className={styles.calendar_icon} />
        </div>
    );
}

export default Book;
