import { hostedVenues } from "../../states/state-functions";
import styles from "../../styles/components/UpdateVenue.module.css";
import YupInput from "../YupInput";
import { useEffect, useState, useRef } from "react";
import ImageRegister from "../ImageRegister";

function UpdateVenue({ id }) {
    const venues = hostedVenues();
    const form = useRef(null);
    const [imageArray, setImageArray] = useState();
    const [hiddenImage, setHiddenImage] = useState();
    const update = venues.find((venue) => {
        return venue.id === id;
    });

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
    return (
        <form ref={form}>
            <YupInput placeholder={update.name} inputName="name" onClick={inputClick} />
            <YupInput
                placeholder={update.media.length}
                inputName="media"
                onChange={(e) => setHiddenImage(e.currentTarget.value)}
                inputId="register_venue_input_image"
                id="register_venue_images_error_message"
            />
            {imageArray && (
                <ImageRegister
                    imageArray={imageArray}
                    setImageArray={setImageArray}
                    hiddenImage={hiddenImage}
                />
            )}
            <textarea placeholder={update.description} onClick={inputClick}></textarea>
            <div>
                <YupInput
                    placeholder={update.location.address}
                    inputName={"street"}
                    required={true}
                    onClick={inputClick}
                />
                <YupInput
                    placeholder={update.location.city}
                    inputName={"city"}
                    required={true}
                    onClick={inputClick}
                />
                <YupInput
                    placeholder={update.location.zip}
                    inputName={"zip"}
                    required={true}
                    onClick={inputClick}
                />
            </div>
            <label htmlFor="price">Price pr day/night</label>
            <input
                type="number"
                placeholder={update.price}
                onClick={inputClick}
                name="price"
            ></input>
            <div className={styles.update_venue_section_boolean}>
                <div className={styles.update_venue_div_boolean}>
                    <h4>Pets</h4>
                    <label htmlFor="pets">No</label>
                    <input
                        type="radio"
                        name="pets"
                        defaultChecked={update.meta.pets ? false : true}
                    ></input>
                    <label htmlFor="pets">Yes</label>
                    <input
                        type="radio"
                        name="pets"
                        defaultChecked={update.meta.pets ? true : false}
                    ></input>
                </div>
                <div className={styles.update_venue_div_boolean}>
                    <h4>Parking</h4>
                    <label htmlFor="parking">No</label>
                    <input
                        type="radio"
                        name="parking"
                        defaultChecked={update.meta.parking ? false : true}
                    ></input>
                    <label htmlFor="parking">Yes</label>
                    <input
                        type="radio"
                        name="parking"
                        defaultChecked={update.meta.parking ? true : false}
                    ></input>
                </div>
                <div className={styles.update_venue_div_boolean}>
                    <h4>Wifi</h4>
                    <label htmlFor="wifi">No</label>
                    <input
                        type="radio"
                        name="wifi"
                        defaultChecked={update.meta.wifi ? false : true}
                    ></input>
                    <label htmlFor="wifi">Yes</label>
                    <input
                        type="radio"
                        name="wifi"
                        defaultChecked={update.meta.wifi ? true : false}
                    ></input>
                </div>
                <div className={styles.update_venue_div_boolean}>
                    <h4>Breakfast</h4>
                    <label htmlFor="breakfast">No</label>
                    <input
                        type="radio"
                        name="breakfast"
                        defaultChecked={update.meta.breakfast ? false : true}
                    ></input>
                    <label htmlFor="breakfast">Yes</label>
                    <input
                        type="radio"
                        name="breakfast"
                        defaultChecked={update.meta.pets ? true : false}
                    ></input>
                </div>
                <div>
                    <label htmlFor="maxGuests">How many guests</label>
                    <select name="maxGuests">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                    </select>
                </div>
            </div>
        </form>
    );
}
export default UpdateVenue;
