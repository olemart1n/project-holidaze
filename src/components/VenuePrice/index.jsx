import styles from "../../styles/components/VenueInfo.module.css";
import { FcCheckmark } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
function VenueInfo({ info }) {
    const meta = info.meta;
    const newArr = [];
    for (const property in meta) {
        const innerObject = {};
        innerObject[property] = meta[property];
        newArr.push(innerObject);
    }
    return (
        <div className={styles.info_layout}>
            <div className={styles.meta_data}>
                {newArr.map((perk, i) => (
                    <div key={i} className={styles.meta_detail}>
                        <p>{Object.keys(perk)}</p>
                        {Object.values(perk).toString() === "true" ? (
                            <FcCheckmark className={styles.check_icon} />
                        ) : (
                            <RxCrossCircled className={styles.check_icon} />
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.info_data}>
                <h5>{info.price} NOK /day</h5>
            </div>
        </div>
    );
}

export default VenueInfo;
