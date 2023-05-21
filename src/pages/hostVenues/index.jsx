import styles from "../../styles/components/HostVenue.module.css";
import React, { useState, startTransition, Suspense } from "react";
import HtmlDialog from "../../components/HtmlDialog";
import RegisterVenue from "../../components/RegisterVenue";
import { openDialog } from "../../features/dialogs";
import Loader from "../../components/Loader";
import HostedVenue from "../../components/HostedVenue";
function HostVenues() {
    return (
        <main className={styles.host_venue}>
            <h1 className={styles.host_venue_h1}>Your Venues</h1>
            {/* <Loader /> */}
            <HostedVenue />

            <button className={styles.host_venue_addButton} onClick={openDialog}>
                Host new venue
            </button>

            <HtmlDialog type="register">
                <RegisterVenue />
            </HtmlDialog>
        </main>
    );
}

export default HostVenues;
