import styles from "../../styles/components/Book.module.css";
import { GoCalendar } from "react-icons/go";
import { months, returnDoubleIntDay } from "../../features/dateAndTime";
import Loader from "../loader";
import { useEffect, useRef, useState } from "react";
import DialogHeader from "../dialogHeader";
import { useParams } from "react-router-dom";
import { specificVenue, user, hostUser, setBookedByUser } from "../../states/state-functions";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { useNavigate } from "react-router-dom";
import { bookVenue, setBookingsByUser } from "../../api";
import Login from "../login";
function Book() {
    const navigate = useNavigate();
    const setBookedVenues = setBookedByUser();
    let authedUser;
    const host = hostUser();
    const notHost = user();
    if (host?.accessToken) {
        authedUser = host;
    } else {
        authedUser = notHost;
    }
    const { id } = useParams();
    const bookDialog = useRef(null);
    const loginDialog = useRef(null);
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
    const [guests, setGuests] = useState(1);
    const stringMonth = returnDoubleIntDay(correctMonth);
    const stringDay = returnDoubleIntDay(day);
    const [viewCalendar, setViewCalendar] = useState(true);
    const htmlInputValue = `${selectedDayRange.from.year}-${stringMonth}-${stringDay}`;
    const [fromStateHelper, setFromStateHelper] = useState(htmlInputValue);
    const [toStateHelper, setToStateHelper] = useState(fromStateHelper);
    const [priceSummary, setPriceSummary] = useState(0);

    useEffect(() => {
        let xDays;
        if (selectedDayRange.to?.day) {
            xDays = selectedDayRange.to.day - selectedDayRange.from.day;
        }
        if (selectedDayRange.from?.day > selectedDayRange.to?.day) {
            let x = selectedDayRange.from.day - selectedDayRange.to.day;
            xDays = selectedDayRange.from.day - x;
        }
        setPriceSummary(xDays * venue.price);
    }, [selectedDayRange]);
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
        setSelectedDayRange(object);
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
        setSelectedDayRange(object);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDayRange.to === null) {
            return;
        }
        const dateFrom = new Date(
            selectedDayRange.from.year,
            selectedDayRange.from.month - 1,
            selectedDayRange.from.day
        );
        const dateTo = new Date(
            selectedDayRange.to.year,
            selectedDayRange.to.month - 1,
            selectedDayRange.to.day
        );
        const data = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            guests: Number(guests),
            venueId: id,
        };

        bookVenue(data, setViewCalendar, authedUser.accessToken);
    };

    useEffect(() => {
        if (viewCalendar === false) {
            setTimeout(() => {
                setBookingsByUser(authedUser.name, authedUser.accessToken, setBookedVenues);
                navigate("/bookings");
            }, 2500);
        }
    }, [viewCalendar]);

    if (!authedUser?.accessToken) {
        return (
            <div>
                <div
                    className={styles.booking_container}
                    onClick={() => loginDialog.current.showModal()}
                >
                    <p>Book this venue</p>
                    <GoCalendar className={styles.calendar_icon} />
                </div>
                <dialog ref={loginDialog} className={styles.dialog_book}>
                    <DialogHeader />
                    <Login />
                </dialog>
            </div>
        );
    }

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
                    <h4>{venue.name}</h4>
                    <h5>{venue.location.city}</h5>
                    <p>Room for {venue.maxGuests}</p>
                </div>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
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
                        {viewCalendar && (
                            <Calendar
                                value={selectedDayRange}
                                onChange={(e) => {
                                    setSelectedDayRange;
                                    calendarStateToInputStates(e);
                                }}
                                shouldHighlightWeekends
                                calendarClassName={styles.responsive_calendar}
                            />
                        )}
                        {!viewCalendar && (
                            <div>
                                <p> You have booked a venue!</p>
                                <Loader />
                            </div>
                        )}
                    </div>
                    {selectedDayRange?.to?.month && (
                        <div className={styles.dialog_book_venue_state_summary}>
                            <div className={styles.dialog_book_venue_state_summary_box}>
                                {" "}
                                <p>{selectedDayRange.from.day}-</p>
                                <p> {months[selectedDayRange.from.month - 1]}</p>
                            </div>
                            <p>TO</p>
                            <div className={styles.dialog_book_venue_state_summary_box}>
                                {" "}
                                <p>{selectedDayRange.to.day}-</p>
                                <p> {months[selectedDayRange.to.month - 1]}</p>
                            </div>
                            <div className={styles.dialog_book_venue_state_summary_guests}>
                                <p>How many will you book for</p>
                                <select
                                    name="maxGuests"
                                    value={guests}
                                    onChange={(e) => setGuests(e.currentTarget.value)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </div>
                            <div className={styles.dialog_book_venue_state_summary_price}>
                                <h4>PRICE</h4>
                                <p>{priceSummary},- NOK</p>
                                <div
                                    className={styles.dialog_book_venue_state_summary_guests_state}
                                >
                                    <h3>{guests}</h3>
                                    <p>GUESTS</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className={styles.dialog_book_venue_submit}
                        onClick={(e) => e.stopPropagation()}
                    >
                        Book Venue!
                    </button>
                </form>
            </dialog>
        </div>
    );
}

export default Book;
