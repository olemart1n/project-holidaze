import styles from "../../styles/components/HostVenues.module.css";
import React from "react";
import HtmlDialog from "../../components/HtmlDialog";
import RegisterVenue from "../../components/RegisterVenue";
// const RegisterVenue = React.lazy(() => import("../../components/RegisterVenue"));
import { closeDialog, openDialog } from "../../features/dialogs";
import { deleteItem } from "../../api/deleteItem";
import url from "../../api/url";
import { hostedVenues, setHostedVenues } from "../../states/state-functions";
import VenueCards from "../../components/VenueCards";
import HostedVenueBookings from "../../components/HostedVenueBookings";
import { timeGap } from "../../features/dateAndTime";
import UpdateVenue from "../../components/UpdateVenue";
import { useState } from "react";

import ContactInfo from "../../components/ContactInfo";

function HostVenues() {
    const venues = hostedVenues();
    const setVenues = setHostedVenues();
    const [updateId, setUpdateId] = useState();
    const [dialogType, setDialogType] = useState("register");
    const [deleteId, setDeleteId] = useState("");
    function Delete() {
        const style = {
            textAlign: "center",
        };
        return (
            <div style={style}>
                <h3>It will no longer be possible to book this venue</h3>
                <button
                    className={styles.host_venue_section_delete}
                    onClick={() => {
                        deleteItem(url.venues, venues, deleteId, setVenues, "hostedVenues");
                        closeDialog();
                    }}
                >
                    Stop hosting
                </button>
            </div>
        );
    }

    const countActiveBookings = (array) => {
        let count = 0;
        if (array) {
            array.forEach((element) => {
                const now = new Date();
                const date = new Date(element.dateTo);
                timeGap(now, date) > 0 && count++;
            });
        }

        return count;
    };
    return (
        <main className={styles.host_venue_wrapper}>
            <h1 className={styles.host_venue_h1}>Your Venues</h1>
            <button
                className={styles.host_venue_addButton}
                onClick={() => {
                    setDialogType("register");
                    openDialog("register");
                    setTimeout(() => {
                        openDialog("register");
                    }, 100);
                }}
            >
                Host new venue
            </button>
            {venues &&
                venues.map((venue, i) => {
                    return (
                        <div key={i} className={styles.host_venue_section}>
                            <div className={styles.host_venue_section_div}>
                                <h4>
                                    You have {countActiveBookings(venue?.bookings)} upcoming
                                    bookings for this venue
                                </h4>
                                <VenueCards data={venue} />
                                <div className={styles.host_venue_section_div_buttons}>
                                    <button
                                        className={styles.host_venue_section_delete}
                                        onClick={() => {
                                            setDialogType("delete");
                                            setDeleteId(venue.id);
                                            setTimeout(() => {
                                                openDialog("delete");
                                            }, 500);
                                        }}
                                    >
                                        Stop hosting
                                    </button>
                                    <button
                                        className={styles.host_venue_section_update}
                                        onClick={() => {
                                            setUpdateId(venue.id);
                                            setDialogType("update");
                                            setTimeout(() => {
                                                openDialog("update");
                                            }, 500);
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>

                            <div className={styles.host_venue_section_div}>
                                {venue?.bookings?.length > 0 ? (
                                    venue.bookings.map((info) => {
                                        return (
                                            <HostedVenueBookings
                                                info={info}
                                                key={info.id}
                                                setDialogType={setDialogType}
                                            />
                                        );
                                    })
                                ) : (
                                    <div>No bookings</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            <HtmlDialog type={dialogType}>
                {dialogType === "register" && <RegisterVenue />}
                {dialogType === "contactInfo" && <ContactInfo />}
                {dialogType === "delete" && <Delete />}
                {dialogType === "update" && <UpdateVenue id={updateId} />}
            </HtmlDialog>
        </main>
    );
}

export default HostVenues;
