import styles from "../../styles/components/HostVenues.module.css";
import React from "react";
import RegisterVenue from "../../components/RegisterVenue";
import { deleteItem, url } from "../../api";
import { hostedVenues, setHostedVenues } from "../../states/state-functions";
import VenueCards from "../../components/VenueCards";
import HostedVenueBookings from "../../components/HostedVenueBookings";
import { timeGap } from "../../features/dateAndTime";
import UpdateVenue from "../../components/UpdateVenue";
import { useState, useRef } from "react";
import { closeFunctionality } from "../../features/dialogs";
import ContactInfo from "../../components/ContactInfo";
import DialogHeader from "../../components/DialogHeader";

function HostVenues() {
    const registerModal = useRef(null);
    const updateModal = useRef(null);
    const contactInfoModal = useRef(null);
    const deleteModal = useRef(null);
    const venues = hostedVenues();
    const setVenues = setHostedVenues();
    const [updateId, setUpdateId] = useState();
    const [pageHasRendered, setPageHasRendered] = useState(false);
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
                        deleteModal.close();
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
                    registerModal.current.showModal();
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
                                            setDeleteId(venue.id);
                                            deleteModal.current.showModal();
                                        }}
                                    >
                                        Stop hosting
                                    </button>
                                    <button
                                        className={styles.host_venue_section_update}
                                        onClick={() => {
                                            setUpdateId(venue.id);
                                            // setDialogType("update");
                                            setPageHasRendered(true);
                                            updateModal.current.showModal();
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>

                            <div className={styles.host_venue_section_div}>
                                {venue?.bookings?.length > 0 ? (
                                    venue.bookings.map((info) => {
                                        return <HostedVenueBookings info={info} key={info.id} />;
                                    })
                                ) : (
                                    <div>No bookings</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            <dialog
                ref={registerModal}
                className={styles.host_venue_register_modal}
                onClick={closeFunctionality}
            >
                <DialogHeader />
                <RegisterVenue />
            </dialog>
            <dialog
                ref={deleteModal}
                className={styles.host_venue_delete_modal}
                onClick={closeFunctionality}
            >
                <DialogHeader />
                <Delete />
            </dialog>
            <dialog
                ref={updateModal}
                className={styles.host_venue_register_modal}
                onClick={closeFunctionality}
            >
                <DialogHeader />
                {pageHasRendered && <UpdateVenue id={updateId} />}
            </dialog>
            <dialog
                ref={contactInfoModal}
                className={styles.host_venue_register_modal}
                onClick={closeFunctionality}
            >
                <DialogHeader />
                {pageHasRendered && <ContactInfo />}
            </dialog>
        </main>
    );
}

export default HostVenues;

{
    /* {dialogType === "contactInfo" && <ContactInfo />} */
}
