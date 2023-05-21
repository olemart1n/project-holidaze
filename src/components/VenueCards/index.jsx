import styles from "../../styles/components/VenueCards.module.css";
import { Link } from "react-router-dom";
import png from "../../assets/wgbh.brightspotcdn.jpg";

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
                let img = media[0];
                if (media[0] === undefined) {
                    img = png;
                }
                return (
                    <Link to={`venue/${id}`} key={id} className={styles.venue_card}>
                        <div className={styles.venue_card_image_div}>
                            <img
                                className={styles.venue_card_img}
                                src={img}
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
