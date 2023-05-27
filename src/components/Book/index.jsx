import styles from "../../styles/components/Book.module.css";
import { GoCalendar } from "react-icons/go";
import { VscChromeClose } from "react-icons/vsc";
import { useRef } from "react";
import DialogHeader from "../DialogHeader";
import { setSpecificVenue, specificVenue } from "../../states/state-functions";
function Book() {
    const bookDialog = useRef(null);
    const venue = specificVenue();
    return (
        <div>
            <div
                className={styles.booking_container}
                onClick={() => bookDialog.current.showModal()}
            >
                <p>Book this venue</p>
                <GoCalendar className={styles.calendar_icon} />
            </div>
            <dialog ref={bookDialog} className={styles.dialog_book}>
                <DialogHeader />
                <div className={styles.dialog_book_venue_info}>
                    <h3>{venue.price} pr night</h3>
                </div>
                <form>here, a calender should display</form>
            </dialog>
        </div>
    );
}

export default Book;
