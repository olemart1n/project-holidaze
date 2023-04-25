import { useState } from "react";
import styles from "../../styles/components/VenueDescription.module.css";

import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

function VenueDescription({ description }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const expandDescription = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };
    return (
        <div className={styles.description_wrapper}>
            <div
                className={
                    !isExpanded
                        ? styles.description_container
                        : styles.description_container_expanded
                }
            >
                <h3 className={styles.description_header}>About</h3>
                <p>{description}</p>
            </div>
            <div className={styles.description_expand} onClick={expandDescription}>
                {!isExpanded ? (
                    <MdOutlineExpandMore className={styles.expand_icon} />
                ) : (
                    <MdOutlineExpandLess />
                )}
            </div>
        </div>
    );
}

export default VenueDescription;
