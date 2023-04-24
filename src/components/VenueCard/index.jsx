import styles from "../../styles/components/VenueCard.module.css";
import { Link } from "react-router-dom";

const VenueCard = (props) => {
    const data = props.json;
    return (
        <div className={styles.venue_cards_wrapper}>
            {data.map(({ name, id, media, description }) => {
                return (
                    <Link to={`venue/${id}`} className={styles.venue_card} key={id}>
                        <img
                            className={styles.venue_card_img}
                            src={media[0]}
                            alt={description}
                        ></img>
                        <div className={styles.venue_card_info}>{name}</div>
                    </Link>
                );
            })}
        </div>
    );
};

export default VenueCard;
