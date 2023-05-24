import { BsFilePerson } from "react-icons/bs";
import styles from "../../styles/components/HostedVenueBookings.module.css";
import fetchCustomer from "../../api/setCustomer";
import { load } from "../../features/storage";
import { setCustomer } from "../../states/state-functions";
import { openDialog } from "../../features/dialogs";
import { timeGap, returnDate, returnDay, returnMonth } from "../../features/dateAndTime";
function HostedVenueBookings({ info, setDialogType }) {
    const setBookingId = setCustomer();
    let style;
    const isStillActive = () => {
        let endsAt = info.dateTo;
        let now = new Date();
        if (timeGap(now, endsAt) > 0) {
            style = styles.host_venue_section_dates;
        } else {
            style = styles.host_venue_section_disabled;
        }
        return style;
    };
    return (
        <div key={info.name} className={isStillActive()}>
            <h4 className={styles.host_venue_section_div_item_h4}>
                {info.guests} people booked this venue from{" "}
            </h4>
            <div className={styles.host_venue_section_div_item_dates}>
                <p className={styles.host_venue_section_div_item}>
                    {returnDate(info.dateFrom)} {returnMonth(info.dateFrom)}
                </p>
                <p className={styles.host_venue_section_div_item}>/</p>
                <p className={styles.host_venue_section_div_item}>
                    {returnDate(info.dateTo)} {returnMonth(info.dateTo)}
                </p>
            </div>
            <div
                className={styles.host_venue_section_contact}
                onClick={(e) => {
                    fetchCustomer(info.id, load("hostUser").accessToken, setBookingId);
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
}

export default HostedVenueBookings;
