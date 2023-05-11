import styles from "../../styles/components/IdCard.module.css";
import { user } from "../../states/state-functions";

function IdCard() {
    const profile = user();
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
