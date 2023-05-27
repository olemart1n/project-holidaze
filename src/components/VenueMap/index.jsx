import styles from "../../styles/components/VenueMap.module.css";
import { FaLocationArrow } from "react-icons/fa";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { specificVenue, setSpecificVenue } from "../../states/state-functions";
import { FaMapMarkerAlt } from "react-icons/fa";
import Loader from "../Loader";
import { useMemo, useRef } from "react";
import { VscChromeClose } from "react-icons/vsc";
function VenueMap({ location }) {
    const mapDialog = useRef(null);
    const ref = { ...location };
    const venue = specificVenue();
    const centerObject = { lat: venue.location.lat, lng: venue.location.lng };
    return (
        <div className={styles.venue_location_div}>
            <div className={styles.venue_location_div_text}>
                <h3>{ref.city === "Unknown" ? "klondike" : ref.city}</h3>
            </div>
            <button
                className={styles.venue_location_button_map}
                onClick={() => {
                    mapDialog.current.showModal();
                }}
            >
                <div>View location on map</div>
                <FaLocationArrow className={styles.venue_location_div_icon} />
            </button>
            <dialog ref={mapDialog} className={styles.venue_map_section}>
                <div className={styles.venue_map_section_div_first}>
                    <button
                        type="button"
                        formMethod="dialog"
                        onClick={() => {
                            mapDialog.current.close();
                        }}
                        className={styles.venue_map_section_div_first_button}
                    >
                        <VscChromeClose
                            className={styles.venue_map_section_div_first_button_icon}
                        />
                    </button>
                </div>
                <Map />
            </dialog>
        </div>
    );

    function Map() {
        const center = useMemo(() => centerObject, []);
        let markerPoint;
        setTimeout(() => {
            markerPoint = center;
        }, 1500);
        return (
            <GoogleMap zoom={15} center={center} mapContainerClassName={styles.map_container}>
                <Marker position={markerPoint}></Marker>
            </GoogleMap>
        );
    }
}

export default VenueMap;
