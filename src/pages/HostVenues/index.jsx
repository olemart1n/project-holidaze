import styles from "../../styles/pages/HostVenues.module.css";
import React, { useEffect } from "react";
import RegisterVenue from "../../components/registerVenue";
import { deleteItem, url } from "../../api";
import { hostedVenues, setHostedVenues } from "../../states/state-functions";
import VenueCards from "../../components/venueCards";
import HostedVenueBookings from "../../components/hostedVenueBookings";
import { timeGap } from "../../features/dateAndTime";
import UpdateVenue from "../../components/updateVenue";
import { useState, useRef } from "react";
import { closeFunctionality } from "../../features/dialogs";
import DialogHeader from "../../components/dialogHeader";
import { Helmet } from "react-helmet-async";

function HostVenues() {
    const registerModal = useRef(null);
    const updateModal = useRef(null);
    const deleteModal = useRef(null);
    const venues = hostedVenues();
    const setVenues = setHostedVenues();
    const [updateId, setUpdateId] = useState();
    const [pageHasRendered, setPageHasRendered] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [regActive, setRegActive] = useState(false);
    function Delete() {
        return (
            <div className={styles.host_venue_section_delete}>
                <h3>It will no longer be possible to book this venue</h3>
                <button
                    className={styles.host_venue_section_delete_button}
                    onClick={() => {
                        setPageHasRendered(false);
                        deleteItem(venues, deleteId, setVenues);
                        deleteModal.current.close();
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
    useEffect(() => {
        if (regActive) {
            registerModal.current.close();
        }
    }, [regActive]);
    return (
        <main className={styles.host_venue_wrapper}>
            <Helmet>
                <title>Your Venues</title>
                <meta name="description" content="Venues you are hosting" />
            </Helmet>
            <div className={styles.host_venue_top}>
                <h1 className={styles.host_venue_h1}>Your Venues</h1>
                <button
                    className="lightblue_button"
                    onClick={() => {
                        setPageHasRendered(false);
                        registerModal.current.showModal();
                    }}
                >
                    Host new venue
                </button>
            </div>

            {venues &&
                venues?.map((venue, i) => {
                    return (
                        <div key={i} className={styles.host_venue_section}>
                            <div className={styles.host_venue_section_div_first}>
                                <VenueCards data={venue} />
                                <div className={styles.host_venue_section_div_buttons}>
                                    <button
                                        className="delete_button"
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
                                            setPageHasRendered(true);
                                            updateModal.current.showModal();
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>

                            <div className={styles.host_venue_section_div}>
                                <h4>
                                    You have {countActiveBookings(venue?.bookings)} upcoming
                                    bookings for this venue
                                </h4>
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
            <dialog ref={registerModal} className="full_dialog" onClick={closeFunctionality}>
                <DialogHeader />
                <RegisterVenue setRegActive={setRegActive} />
            </dialog>
            <dialog ref={deleteModal} className="small_dialog" onClick={closeFunctionality}>
                <DialogHeader />
                <Delete />
            </dialog>
            <dialog ref={updateModal} className="full_dialog" onClick={closeFunctionality}>
                <DialogHeader />
                {pageHasRendered && <UpdateVenue id={updateId} />}
            </dialog>
        </main>
    );
}

export default HostVenues;
