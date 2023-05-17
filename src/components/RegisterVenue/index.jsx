import styles from "../../styles/components/RegisterVenue.module.css";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineDelete } from "react-icons/md";
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
                <button>submit</button>
                <h3 onClick={() => console.log(city, country)}>
                    description. price. meta[wifi, parking, breakfast, pets]. Location[adress, city,
                    zip, country, continent, lat, lang]
                </h3>
            </form>
        </LoadScript>
    );
}
export default RegisterVenue;
