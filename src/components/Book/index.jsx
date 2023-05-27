import styles from "../../styles/components/Book.module.css";
import { GoCalendar } from "react-icons/go";
import { VscChromeClose } from "react-icons/vsc";
import { useRef } from "react";
function Book() {
    const bookDialog = useRef(null);
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
                <div className={styles.dialog_book_header}>
                    <button
                        type="button"
                        formMethod="dialog"
                        onClick={() => bookDialog.current.close()}
                        className={styles.dialog_book_close_button}
                    >
                        <VscChromeClose className={styles.dialog_book_close_button_icon} />
                    </button>
                </div>
            </dialog>
        </div>
    );
}

export default Book;
