import { hostedVenues, hostUser, setHostedVenues } from "../../states/state-functions";
import styles from "../../styles/components/UpdateVenue.module.css";
import YupInput from "../YupInput";
import { useEffect, useState, useRef } from "react";
import ImageRegister from "../ImageRegister";
import { FaDog } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { MdOutlineBreakfastDining } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { updateVenue } from "../../api/updateVenue";
import Loader from "../Loader";

function UpdateVenue({ id }) {
    const venues = hostedVenues();
    const setVenues = setHostedVenues();
    const user = hostUser();
    const form = useRef(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [imageArray, setImageArray] = useState();
    const [hiddenImage, setHiddenImage] = useState();
    const update = venues.find((venue) => {
        return venue.id === id;
    });
    let wifiStyle;
    let petsStyle;
    let parkingStyle;
    let breakfastStyle;

    if (update.meta.wifi) {
        wifiStyle = styles.update_venue_boolean_true;
    } else {
        wifiStyle = styles.update_venue_boolean_false;
    }
    if (update.meta.pets) {
        petsStyle = styles.update_venue_boolean_true;
    } else {
        petsStyle = styles.update_venue_boolean_false;
    }
    if (update.meta.parking) {
        parkingStyle = styles.update_venue_boolean_true;
    } else {
        parkingStyle = styles.update_venue_boolean_false;
    }
    if (update.meta.breakfast) {
        breakfastStyle = styles.update_venue_boolean_true;
    } else {
        breakfastStyle = styles.update_venue_boolean_false;
    }

    useEffect(() => {
        setImageArray(update.media);
        Array.from(form.current.elements).forEach((el) => {
            el.value = null;
        });
    }, [update]);

    const inputClick = (e) => {
        if (e.currentTarget.hasAttribute("modified")) {
            return;
        }
        let placeholder = e.currentTarget.placeholder;
        e.currentTarget.value = placeholder;
        e.currentTarget.setAttribute("modified", true);
    };

    const metaClick = (e) => {
        const input = e.currentTarget;
        if (input.id === "false") {
            input.id = "true";
            input.className = styles.update_venue_boolean_true;
        } else if (input.id === "true") {
            input.id = "false";
            input.className = styles.update_venue_boolean_false;
        }
    };

    let checkedWifi;
    let checkedPets;
    let checkedParking;
    let checkedBreakfast;

    const handleSubmit = (e) => {
        e.preventDefault();
        Array.from(form.current.elements).forEach((el) => {
            if (el.placeholder && !el.hasAttribute("modified")) {
                el.value = el.placeholder;
            }
            if (el.type === "number" && el.hasAttribute("modified")) {
                el.value = Number(el.placeholder);
            } else if (el.type === "number" && !el.hasAttribute("modified")) {
                el.value = ~~el.placeholder;
            }
            ////

            if (el.type === "button" && el.name === "wifi" && el.id === "true") {
                checkedWifi = el.id === "true";
            } else if (el.type === "button" && el.name === "wifi" && el.id === "false") {
                checkedWifi = el.id === "true";
            }

            if (el.type === "button" && el.name === "pets" && el.id === "true") {
                checkedPets = el.id === "true";
            } else if (el.type === "button" && el.name === "pets" && el.id === "false") {
                checkedPets = el.id === "true";
            }

            if (el.type === "button" && el.name === "parking" && el.id === "true") {
                checkedParking = el.id === "true";
            } else if (el.type === "button" && el.name === "parking" && el.id === "false") {
                checkedParking = el.id === "true";
            }

            if (el.type === "button" && el.name === "breakfast" && el.id === "true") {
                checkedBreakfast = el.id === "true";
            } else if (el.type === "button" && el.name === "breakfast" && el.id === "false") {
                checkedBreakfast = el.id === "true";
            }
        });
        const formInputs = new FormData(form.current);

        const newVenue = Object.fromEntries(formInputs.entries());
        const { name, city, street, zip, price, description, maxGuests } = newVenue;
        const data = {
            name,
            description,
            media: imageArray,
            price: Number(price),
            maxGuests: maxGuests === undefined ? update.maxGuests : Number(maxGuests),
            meta: {
                wifi: checkedWifi,
                parking: checkedParking,
                breakfast: checkedBreakfast,
                pets: checkedPets,
            },
            location: {
                address: street,
                city,
                zip,
                country: update.location.country,
                continent: update.location.continent,
                lat: update.location.lat,
                lng: update.location.lng,
            },
        };

        updateVenue(data, id, user.accessToken, setError, setSuccess, venues, setVenues);
    };
    return (
        <form ref={form} onSubmit={handleSubmit} className={styles.update_venue_form}>
            <div className={styles.update_venue_location_div}>
                <label htmlFor="name">Name</label>
                <input
                    className={styles.update_venue_input}
                    placeholder={update.name}
                    name="name"
                    onClick={inputClick}
                    onFocus={inputClick}
                ></input>
            </div>
            <YupInput
                name="media"
                onChange={(e) => setHiddenImage(e.currentTarget.value)}
                inputId="register_venue_input_image"
                id="register_venue_images_error_message"
                placeholder="paste url"
            />
            {imageArray && (
                <ImageRegister
                    imageArray={imageArray}
                    setImageArray={setImageArray}
                    hiddenImage={hiddenImage}
                />
            )}
            <textarea
                placeholder={update.description}
                onClick={inputClick}
                name="description"
                onFocus={inputClick}
            ></textarea>
            <div className={styles.update_venue_location}>
                <div className={styles.update_venue_location_div}>
                    <label htmlFor="street">Street</label>
                    <input
                        className={styles.update_venue_input}
                        placeholder={update.location.address}
                        name={"street"}
                        onClick={inputClick}
                        onFocus={inputClick}
                    />
                </div>
                <div className={styles.update_venue_location_div}>
                    <label htmlFor="city">City</label>
                    <input
                        className={styles.update_venue_input}
                        placeholder={update.location.city}
                        name={"city"}
                        onClick={inputClick}
                        onFocus={inputClick}
                    />
                </div>
                <div className={styles.update_venue_location_div}>
                    <label htmlFor="zip">zip</label>
                    <input
                        className={styles.update_venue_input}
                        placeholder={update.location.zip}
                        name={"zip"}
                        onClick={inputClick}
                        onFocus={inputClick}
                    />
                </div>
            </div>
            <label className={styles.update_venue_price_label} htmlFor="price">
                Price pr day/night
            </label>
            <input
                className={styles.update_venue_input}
                type="number"
                placeholder={update.price}
                onClick={inputClick}
                onFocus={inputClick}
                name="price"
            ></input>
            {/* ---------------    -- - - - - - -- - -- - -- --------------------------------------- */}
            <div className={styles.update_venue_boolean}>
                <button
                    type="button"
                    className={petsStyle}
                    id={update.meta.pets ? "true" : "false"}
                    onClick={metaClick}
                    name="pets"
                    value={update.meta.pets}
                >
                    <p>Pets</p>
                    <FaDog />
                </button>
                <button
                    type="button"
                    className={parkingStyle}
                    id={update.meta.parking ? "true" : "false"}
                    onClick={metaClick}
                    name="parking"
                >
                    <p>Parking</p>
                    <FaParking />
                </button>
                <button
                    type="button"
                    className={breakfastStyle}
                    id={update.meta.breakfast ? "true" : "false"}
                    onClick={metaClick}
                    name="breakfast"
                >
                    <p>Breakfast</p>
                    <MdOutlineBreakfastDining />
                </button>
                <button
                    type="button"
                    id={update.meta.wifi ? "true" : "false"}
                    className={wifiStyle}
                    onClick={metaClick}
                    name="wifi"
                >
                    <p>Wifi</p>
                    <AiOutlineWifi />
                </button>
            </div>
            <div className={styles.update_venue_select_div}>
                <label htmlFor="maxGuests">How many guests</label>
                <select name="maxGuests" defaultValue="1">
                    <option value="0">Please Select Option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>
            <div>
                {success ? (
                    <div>
                        <Loader />
                        <p>Your venue has been updated</p>
                    </div>
                ) : (
                    <button
                        className={styles.update_venue_submit_button}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        submit
                    </button>
                )}
                {error && !success && <p>{error}</p>}
            </div>
        </form>
    );
}
export default UpdateVenue;
