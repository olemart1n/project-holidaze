import styles from "../../styles/components/RegisterVenue.module.css";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineDelete } from "react-icons/md";
import { TbCurrencyKroneSwedish } from "react-icons/tb";
import { LoadScript } from "@react-google-maps/api";
import LocationSearchInput from "../LocationSearchInput";
import YupInput from "../YupInput";
import venueSchema from "../../features/schema/venueschema";
import googleApiLibraries from "../../constants/googleApiLibraries";
import { registerVenue } from "../../api/registerVenue";
import { hostUser } from "../../states/state-functions";
import HtmlDialog from "../HtmlDialog";
function RegisterVenue() {
    const host = hostUser();
    const [hiddenImage, setHiddenImage] = useState();
    const [imageArray, setImageArray] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [continent, setContinent] = useState("");
    const [street, setStreet] = useState("");
    const [latLng, setLatLng] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(venueSchema),
    });

    const errorMessage = (e) => {
        const errorMessage = document.querySelector("#register_venue_images_error_message");
        errorMessage.innerHTML = "please use a valid image url";
        setTimeout(() => {
            errorMessage.innerHTML = "";
        }, 4000);
    };

    const removeArrayImage = (e) => {
        let images = [...imageArray];
        let index = e.currentTarget.id;
        images.splice(index, 1);
        setImageArray(images);
    };

    const onSubmit = (data, e) => {
        // e.preventDefault();
        const submitData = {
            name: data.name,
            description: data.description,
            media: imageArray,
            maxGuests: data.maxGuests,
            rating: 5,
            price: data.price,
            meta: {
                wifi: data.wifi,
                parking: data.parking,
                pets: data.pets,
                breakfast: data.breakfast,
            },
            location: {
                address: street,
                city: city,
                zip: zip,
                country: country,
                continent: continent,
                lat: latLng.lat,
                lng: latLng.lng,
            },
        };
        registerVenue(submitData, host.accessToken, setError, setSuccess);
    };

    return (
        // <LoadScript
        //     googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        //     libraries={googleApiLibraries}
        // >
        <form
            onSubmit={handleSubmit((data, e) => onSubmit(data, e))}
            autoComplete="off"
            className={styles.register_venue_form}
        >
            <div className={styles.register_venue_section_one}>
                <YupInput
                    placeholder="give your venue a name"
                    errors={errors}
                    register={register}
                    inputName="name"
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"media"}
                    onChange={(e) => setHiddenImage(e.currentTarget.value)}
                    type="url"
                    id="register_venue_images_error_message"
                    placeholder="paste in url"
                    inputId="register_venue_input_image"
                />

                <img
                    className={styles.register_venue_hiddenImg}
                    alt="Hidden from view"
                    onError={errorMessage}
                    src={hiddenImage}
                    onLoad={() => {
                        setImageArray([...imageArray, hiddenImage]);
                        setTimeout(() => {
                            const input = document.querySelector("#register_venue_input_image");
                            input.value = "";
                        }, 800);
                    }}
                ></img>
                <div className={styles.register_venue_images_section}>
                    {imageArray.map((image, index) => (
                        <div className={styles.register_venue_image_div} key={index}>
                            <img
                                alt="image of venue"
                                src={image}
                                className={styles.register_venue_image_image}
                            ></img>
                            <button
                                onClick={(e) => removeArrayImage(e)}
                                type="button"
                                className={styles.register_venue_image_delete_button}
                                id={index}
                            >
                                <MdOutlineDelete
                                    className={styles.register_venue_image_delete_button_icon}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.register_venue_section_two}>
                <label className={styles.register_venue_description_label} htmlFor="description">
                    Give Your Venue A Description
                </label>
                <textarea
                    {...register("description")}
                    className={styles.register_venue_description_input}
                ></textarea>
                <p className={styles.yup_input_error}>{errors.description?.message}</p>
            </div>
            <div className={styles.register_venue_section_three}>
                <h4 className={styles.register_venue_address_header}>Address Information</h4>
                <div className={styles.register_venue_location_search}>
                    <LocationSearchInput
                        error={errors}
                        setCity={setCity}
                        setZip={setZip}
                        setCountry={setCountry}
                        setStreet={setStreet}
                        setLatLng={setLatLng}
                        register={register}
                        setContinent={setContinent}
                    />
                </div>
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"street"}
                    onChange={(e) => setStreet(e.currentTarget.value)}
                    value={street}
                    required={true}
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"city"}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    value={city}
                    required={true}
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"zip"}
                    onChange={(e) => setZip(e.currentTarget.value)}
                    value={zip}
                    required={true}
                />

                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"country"}
                    onChange={(e) => setCountry(e.currentTarget.value)}
                    value={country}
                    required={true}
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"continent"}
                    onChange={(e) => setContinent(e.currentTarget.value)}
                    value={continent}
                />
            </div>
            <div className={styles.register_venue_information}>
                <h4 className={styles.register_venue_information_boolean_header}>Information</h4>
                <div className={styles.register_venue_information_1}>
                    <label htmlFor="price">Price pr day/night</label>
                    <input
                        type="number"
                        name="price"
                        {...register("price")}
                        className={styles.register_venue_information_1_input}
                    ></input>

                    <TbCurrencyKroneSwedish
                        className={styles.register_venue_information_1_kroner}
                    />
                </div>
                <div className={styles.register_venue_information_boolean}>
                    <h4>Is Pets Allowed?</h4>
                    <label htmlFor="pets">No</label>
                    <input
                        type="radio"
                        name="pets"
                        defaultChecked={true}
                        {...register("pets")}
                        value={false}
                    ></input>
                    <label htmlFor="pets">Yes</label>
                    <input type="radio" name="pets" value={true} {...register("pets")}></input>
                </div>
                <div className={styles.register_venue_information_boolean}>
                    <h4>Parking</h4>
                    <label htmlFor="parking">No</label>
                    <input
                        type="radio"
                        name="parking"
                        defaultChecked={true}
                        {...register("parking")}
                        value={false}
                    ></input>
                    <label htmlFor="parking">Yes</label>
                    <input
                        type="radio"
                        name="parking"
                        value={true}
                        {...register("parking")}
                    ></input>
                </div>
                <div className={styles.register_venue_information_boolean}>
                    <h4>Wifi</h4>
                    <label htmlFor="wifi">No</label>
                    <input
                        type="radio"
                        name="wifi"
                        defaultChecked={true}
                        {...register("wifi")}
                        value={false}
                    ></input>
                    <label htmlFor="wifi">Yes</label>
                    <input type="radio" name="wifi" value={true} {...register("wifi")}></input>
                </div>
                <div className={styles.register_venue_information_boolean}>
                    <h4>Breakfast</h4>
                    <label htmlFor="breakfast">No</label>
                    <input
                        type="radio"
                        name="breakfast"
                        defaultChecked={true}
                        value={false}
                        {...register("breakfast")}
                    ></input>
                    <label htmlFor="breakfast">Yes</label>
                    <input
                        type="radio"
                        name="breakfast"
                        value={true}
                        {...register("breakfast")}
                    ></input>
                </div>
                <div className={styles.register_venue_information_2}>
                    <label htmlFor="maxGuests">How many guests</label>
                    <select name="maxGuests" {...register("maxGuests")}>
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
            <div className={styles.register_venue_div_submit}>
                {success ? (
                    <p className={styles.register_venue_div_submit_success}>
                        You have setSuccessfully submitted a venue
                    </p>
                ) : (
                    <button className={styles.register_venue_submit_button}>submit</button>
                )}
                {error && !success && (
                    <p className={styles.register_venue_div_submit_error}>{error}</p>
                )}
            </div>
        </form>
        // </LoadScript>
    );
}
export default RegisterVenue;
