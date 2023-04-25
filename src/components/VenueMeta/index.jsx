import styles from "../../styles/components/VenueMeta.module.css";
import { FcCheckmark } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
function VenueMeta({ meta }) {
    const newArr = [];
    for (const property in meta) {
        const innerObject = {};
        innerObject[property] = meta[property];
        newArr.push(innerObject);
    }
    return (
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
    );
}

export default VenueMeta;
