import styles from "../../styles/components/RegisterVenue.module.css";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineDelete } from "react-icons/md";
import { TbCurrencyKroneSwedish } from "react-icons/tb";
import { LoadScript } from "@react-google-maps/api";
import LocationSearchInput from "../LocationSearchInput";
import YupInput from "../YupInput";
import venueSchema from "../../features/schema/venueschema";
import googleApiLibraries from "../../constants/googleApiLibraries";

function RegisterVenue() {
    const [hiddenImage, setHiddenImage] = useState();
    const [imageArray, setImageArray] = useState([]);

    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [street, setStreet] = useState("");
    const [latLng, setLatLng] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(venueSchema),
    });

    const onSubmit = (e) => {
        // data.image = imageArray;
        console.log(e);
    };

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

    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={googleApiLibraries}
        >
            <form onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
                <YupInput
                    placeholder="give your venue a name"
                    errors={errors}
                    register={register}
                    inputName="name"
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"image"}
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
                <h4>Address Information</h4>
                <LocationSearchInput
                    error={errors}
                    setCity={setCity}
                    setZip={setZip}
                    setCountry={setCountry}
                    setStreet={setStreet}
                    setLatLng={setLatLng}
                    register={register}
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"street"}
                    onChange={(e) => setStreet(e.currentTarget.value)}
                    value={street}
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"city"}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    value={city}
                />
                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"zip"}
                    onChange={(e) => setZip(e.currentTarget.value)}
                    value={zip}
                />

                <YupInput
                    errors={errors}
                    register={register}
                    inputName={"country"}
                    onChange={(e) => setCountry(e.currentTarget.value)}
                    value={country}
                />
                <YupInput errors={errors} register={register} inputName={"continent"} />
                <div className={styles.register_venue_description_div}>
                    <label
                        className={styles.register_venue_description_label}
                        htmlFor="description"
                    >
                        Give Your Venue A Description
                    </label>
                    <textarea
                        {...register("description")}
                        className={styles.register_venue_description_input}
                    ></textarea>
                    <p className={styles.yup_input_error}>{errors.description?.message}</p>
                </div>
                <div className={styles.register_venue_information}>
                    <h4 className={styles.register_venue_information_boolean_header}>
                        Information
                    </h4>
                    <div className={styles.register_venue_information_1}>
                        <label htmlFor="price">Price pr day/night</label>
                        <input type="number" name="price"></input>

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
                <button>submit</button>

                <h3 onClick={() => console.log(city, country)}>continent, lat, lang</h3>
            </form>
        </LoadScript>
    );
}
export default RegisterVenue;
