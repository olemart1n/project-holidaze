import styles from "../../styles/components/HostVenues.module.css";
import React from "react";
import HtmlDialog from "../../components/HtmlDialog";
import RegisterVenue from "../../components/RegisterVenue";
// const RegisterVenue = React.lazy(() => import("../../components/RegisterVenue"));
import { openDialog } from "../../features/dialogs";
import Loader from "../../components/Loader";
import { hostedVenues, setCustomer } from "../../states/state-functions";
import VenueCards from "../../components/VenueCards";
import { timeGap, returnDate, returnDay, returnMonth } from "../../features/dateAndTime";
import { useState, useRef } from "react";
import { BsFilePerson } from "react-icons/bs";
import ContactInfo from "../../components/ContactInfo";
import fetchCustomer from "../../api/setCustomer";
import { load } from "../../features/storage";
function HostVenues() {
    const venues = hostedVenues();
    const setBookingId = setCustomer();
    const [state, setState] = useState(0);
    const [dialogType, setDialogType] = useState("register");
    const now = new Date();

    return (
        <main className={styles.host_venue}>
            <h1 className={styles.host_venue_h1}>Your Venues</h1>
            <button
                className={styles.host_venue_addButton}
                onClick={() => {
                    setDialogType("register");
                    openDialog("register");
                    setTimeout(() => {
                        openDialog("register");
                    }, 500);
                }}
            >
                Host new venue
            </button>
            {/* <Loader /> */}
            <div>
                {venues.map((venue) => {
                    return (
                        <div key={venue.id} className={styles.host_venue_section}>
                            <div>
                                <h4>You have {state} upcoming bookings for this venue</h4>
                                <VenueCards data={venue} />
                            </div>
                            <div className={styles.host_venue_section_div}>
                                {venue.bookings.map((info) => {
                                    timeGap(now, info.dateTo) > 0 && setState((data) => data + 1);
                                    return (
                                        <div
                                            key={info.id}
                                            className={
                                                state > 0
                                                    ? styles.host_venue_section_dates
                                                    : styles.host_venue_section_disabled
                                            }
                                        >
                                            <h4 className={styles.host_venue_section_div_item}>
                                                {info.guests} people booked this venue from{" "}
                                            </h4>
                                            <p className={styles.host_venue_section_div_item}>
                                                {returnDate(info.dateFrom)}{" "}
                                                {returnMonth(info.dateFrom)}
                                            </p>
                                            <p className={styles.host_venue_section_div_item}>/</p>
                                            <p className={styles.host_venue_section_div_item}>
                                                {returnDate(info.dateTo)} {returnMonth(info.dateTo)}
                                            </p>
                                            <div
                                                className={styles.host_venue_section_contact}
                                                onClick={(e) => {
                                                    fetchCustomer(
                                                        info.id,
                                                        load("hostUser").accessToken,
                                                        setBookingId
                                                    );
                                                    setDialogType("contactInfo");
                                                    setTimeout(() => {
                                                        openDialog("contactInfo");
                                                    }, 500);
                                                }}
                                            >
                                                <i>info</i>
                                                <BsFilePerson />
                                            </div>
                                        </div>
                                    );
                                })}
                                <div>
                                    <button className={styles.host_venue_section_delete}>
                                        Stop hosting
                                    </button>
                                    <button className={styles.host_venue_section_update}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <HtmlDialog type={dialogType}>
                {dialogType === "register" ? <RegisterVenue /> : <ContactInfo />}
            </HtmlDialog>
        </main>
    );
}

export default HostVenues;
