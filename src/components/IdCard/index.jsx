import styles from "../../styles/components/IdCard.module.css";
import { user, hostUser } from "../../states/state-functions";

function IdCard() {
    let profile;
    const loggedInUser = user();
    const loggedInHost = hostUser();
    if (loggedInHost.name) {
        profile = loggedInHost;
    } else {
        profile = loggedInUser;
    }
    return (
        <div className={styles.idCard}>
            <div className={styles.idCard_image_div}>
                <img className={styles.idCard_image} src={profile?.avatar}></img>
            </div>
            <div className={styles.idCard_info_div}>
                <h3 className={styles.idCard_name}>{profile.name}</h3>
                <h4 className={styles.idCard_email}>{profile.email}</h4>
            </div>
        </div>
    );
}

export default IdCard;
