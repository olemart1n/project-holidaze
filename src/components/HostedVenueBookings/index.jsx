import { BsFilePerson } from "react-icons/bs";
import styles from "../../styles/components/HostedVenueBookings.module.css";
import { fetchCustomer } from "../../api";
import { load } from "../../features/storage";
import { setCustomer } from "../../states/state-functions";
import { timeGap, returnDate, returnMonth } from "../../features/dateAndTime";
import ContactInfo from "../contactInfo";
import DialogHeader from "../dialogHeader";
import { useRef } from "react";
import { closeFunctionality } from "../../features/dialogs";

function HostedVenueBookings({ info }) {
    const setBookingId = setCustomer();
    const contactInfoModal = useRef(null);
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
                    contactInfoModal.current.showModal();
                }}
            >
                <i>Show info</i>
                <BsFilePerson />
            </div>
            <dialog ref={contactInfoModal} className="small_dialog" onClick={closeFunctionality}>
                <DialogHeader />
                <ContactInfo />
            </dialog>
        </div>
    );
}

export default HostedVenueBookings;
