import styles from "../../styles/components/FilteredVenue.module.css";
import { Link } from "react-router-dom";
import png from "../../assets/wgbh.brightspotcdn.jpg";

function FilteredVenue({ data }) {
    const { name, id, media, description, location } = data;
    let img = media[0];
    if (media[0] === undefined) {
        img = png;
    }
    return (
        <Link to={`/venue/${id}`} key={id} className={styles.filtered_venue_link}>
            <div className={styles.filtered_venue_image_div}>
                <img className={styles.filtered_venue_image} src={img} alt={description}></img>
            </div>
            <div className={styles.filtered_venue_div_info}>
                <div className={styles.filtered_venue_div_info_div_first}>
                    <h3>{name}</h3>
                </div>

                <div className={styles.filtered_venue_div_info_div}>
                    <p>{location.city}</p>
                </div>
            </div>
        </Link>
    );
}

export default FilteredVenue;
