import styles from "../../styles/components/VenueCards.module.css";
import { Link } from "react-router-dom";

const VenueCards = (props) => {
    const data = props.json;

    const cityName = (city) => {
        if (city === "Unknown") {
            return "Klondike";
        } else {
            return city;
        }
    };
    return (
        <div className={styles.venue_cards_wrapper}>
            {data.map(({ name, id, media, description, price, location }) => {
                return (
                    <Link to={`venue/${id}`} key={id} className={styles.venue_card}>
                        <div className={styles.venue_card_image_div}>
                            <img
                                className={styles.venue_card_img}
                                src={media[0]}
                                alt={description}
                            ></img>
                        </div>
                        <div className={styles.venue_card_info}>
                            <h3 className={styles.venue_card_info_h3}>{name}</h3>
                            <div className={styles.venue_card_info_div}>
                                <p className={styles.venue_card_info_price}>{price} NOK/ day</p>
                                <p>{cityName(location.city)}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default VenueCards;
