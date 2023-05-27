import styles from "../../styles/components/Book.module.css";
import { GoCalendar } from "react-icons/go";
import { VscChromeClose } from "react-icons/vsc";
import { returnDay, returnMonth, months, returnDoubleIntDay } from "../../features/dateAndTime";
import { useEffect, useRef, useState } from "react";
import DialogHeader from "../DialogHeader";
import { setSpecificVenue, specificVenue } from "../../states/state-functions";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
function Book() {
    const bookDialog = useRef(null);
    const venue = specificVenue();
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth();
    const correctMonth = month + 1;
    const day = nowDate.getDate();
    const defaultRange = {
        from: { year, month: correctMonth, day: day },
        to: null,
    };
    const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);
    const stringMonth = returnDoubleIntDay(correctMonth);
    const stringDay = returnDoubleIntDay(day);
    const htmlInputValue = `${selectedDayRange.from.year}-${stringMonth}-${stringDay}`;
    const [fromStateHelper, setFromStateHelper] = useState(htmlInputValue);
    const [toStateHelper, setToStateHelper] = useState(fromStateHelper);
    const calendarStateToInput = (e) => {};
    const setFromState = (e) => {
        const newYear = Number(e.currentTarget.value.substring(0, 4));
        const newMonth = Number(e.currentTarget.value.substring(6, 7));
        const newDay = Number(e.currentTarget.value.substring(8, 10));
        let object = {
            from: {
                year: newYear,
                month: newMonth,
                day: newDay,
            },
            to: selectedDayRange.to,
        };
        const stringMonth = returnDoubleIntDay(object.from.month);
        const stringDay = returnDoubleIntDay(object.from.day);
        setFromStateHelper(`${object.from.year}-${stringMonth}-${stringDay}`);
        setSelectedDayRange((data) => (data = object));
    };
    const setToState = (e) => {
        const newYear = Number(e.currentTarget.value.substring(0, 4));
        const newMonth = Number(e.currentTarget.value.substring(6, 7));
        const newDay = Number(e.currentTarget.value.substring(8, 10));
        let object = {
            from: selectedDayRange.from,
            to: {
                year: newYear,
                month: newMonth,
                day: newDay,
            },
        };
        const stringMonth = returnDoubleIntDay(object.from.month);
        const stringDay = returnDoubleIntDay(object.from.day);
        setToStateHelper(`${object.from.year}-${stringMonth}-${stringDay}`);
        setSelectedDayRange((data) => (data = object));
    };

    const calendarStateToInputStates = (e) => {
        const stringMonth = returnDoubleIntDay(e.from.month);
        const stringDay = returnDoubleIntDay(e.from.day);
        setFromStateHelper(`${e.from.year}-${stringMonth}-${stringDay}`);
        if (e.to !== null) {
            const stringMonth = returnDoubleIntDay(e.to.month);
            const stringDay = returnDoubleIntDay(e.to.day);
            setToStateHelper(`${e.to.year}-${stringMonth}-${stringDay}`);
        }
        setSelectedDayRange(e);
    };

    return (
        <div>
            <div
                className={styles.booking_container}
                onClick={() => bookDialog.current.showModal([])}
            >
                <p>Book this venue</p>
                <GoCalendar className={styles.calendar_icon} />
            </div>
            <dialog ref={bookDialog} className={styles.dialog_book}>
                <DialogHeader />
                <div className={styles.dialog_book_venue_info}>
                    <h4>{venue.name}</h4>
                    <h5>{venue.location.city}</h5>
                    <p>Room for {venue.maxGuests}</p>
                </div>
                <form>
                    <div className={styles.dialog_book_venue_date_input}>
                        <input
                            type="date"
                            value={fromStateHelper}
                            onChange={(e) => setFromState(e)}
                        ></input>
                        <input
                            type="date"
                            value={toStateHelper}
                            onChange={(e) => setToState(e)}
                        ></input>
                    </div>
                    <div className={styles.dialog_book_venue_calendar}>
                        <Calendar
                            value={selectedDayRange}
                            onChange={(e) => {
                                calendarStateToInputStates(e);
                            }}
                            shouldHighlightWeekends
                            calendarClassName={styles.responsive_calendar}
                        />
                    </div>
                    {selectedDayRange?.to?.month && (
                        <div className={styles.dialog_book_venue_state_summary}>
                            <div className={styles.dialog_book_venue_state_summary_box}>
                                {" "}
                                <p>{selectedDayRange.from.day}</p>
                                <p> {months[selectedDayRange.from.month - 1]}</p>
                            </div>
                            <div className={styles.dialog_book_venue_state_summary_box}>
                                {" "}
                                <p>{selectedDayRange.to.day}</p>
                                <p> {months[selectedDayRange.to.month - 1]}</p>
                            </div>
                        </div>
                    )}
                    <button type="button" onClick={() => console.log(selectedDayRange)}>
                        test button
                    </button>
                </form>
            </dialog>
        </div>
    );
}

export default Book;
