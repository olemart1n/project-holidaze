import { customer } from "../../states/state-functions";
import styles from "../../styles/components/ContactInfo.module.css";
import Loader from "../Loader";
function ContactInfo() {
    const info = customer();

    return info?.name ? (
        <div className={styles.contactInfo}>
            <h3>{info.name}</h3>
            <p>{info.email}</p>
            <img className={styles.contactInfo_img} src={info.avatar}></img>
        </div>
    ) : (
        <Loader />
    );
}
export default ContactInfo;
