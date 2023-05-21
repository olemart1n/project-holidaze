import styles from "../../styles/components/HostVenue.module.css";
import HtmlDialog from "../../components/HtmlDialog";
import RegisterVenue from "../../components/RegisterVenue";
import { openDialog } from "../../features/dialogs";
import Loader from "../../components/Loader";
import { hostedVenues } from "../../states/state-functions";
import VenueCards from "../../components/VenueCards";
import HostedVenue from "../../components/HostedVenue";
function HostVenues() {
    const venues = hostedVenues();
    console.log(venues);
    return (
        <main className={styles.host_venue}>
            <h1 className={styles.host_venue_h1}>Your Venues</h1>
            {/* <Loader /> */}
            {/* <HostedVenue /> */}
            <VenueCards json={venues} />
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
