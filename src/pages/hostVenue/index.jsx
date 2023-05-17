import styles from "../../styles/components/HostVenue.module.css";
import React from "react";
import HtmlDialog from "../../components/HtmlDialog";
const RegisterVenue = React.lazy(() => import("../../components/RegisterVenue"));
import { openDialog } from "../../features/dialogs";
import { user } from "../../states/state-functions";

function HostVenue() {
    return (
        <main className={styles.host_venue}>
            <h1 className={styles.host_venue_h1}>Your Venues</h1>
            <button className={styles.host_venue_addButton} onClick={openDialog}>
                Host new venue
            </button>
            <HtmlDialog type="register">
                <RegisterVenue />
            </HtmlDialog>
        </main>
    );
}

export default HostVenue;
