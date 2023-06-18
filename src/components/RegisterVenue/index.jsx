import styles from "../../styles/components/RegisterVenue.module.css";
import { useEffect, useState } from "react";
import LocationSearchInput from "../locationSearchInput";
import { registerVenue } from "../../api";
import { hostUser, setHostedVenues, hostedVenues } from "../../states/state-functions";
import { save } from "../../features/storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import venueSchema from "../../features/schema/venueschema";
import ImageRegister from "../imageRegister";
import InformationRegister from "../informationRegister";
import { preventDialogClose } from "../../features/dialogs";
function RegisterVenue({ setRegActive }) {
    const navigate = useNavigate();
    const venues = hostedVenues();
    const setVenue = setHostedVenues();
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

    const submitVenue = (data) => {
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
        let test = venues;
        test.push(submitData);
        registerVenue(submitData, host.accessToken, setError, setSuccess);
        setVenue(test);
        save("hostedVenues", test);
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                // navigate("/host/venue");
                setRegActive(true);
            }, 2500);
        }
    }, [success]);

    return (
        <form
            onSubmit={handleSubmit((data) => submitVenue(data))}
            autoComplete="off"
            className={styles.register_venue_form}
        >
            <div className={styles.register_venue_section_one}>
                <div className="yup_section">
                    <label className="yup_label" htmlFor="name">
                        Name
                    </label>
                    <input
                        placeholder="give your venue a name"
                        errors={errors}
                        {...register("name")}
                        type="name"
                        name="name"
                        className="yup_input"
                    ></input>
                    <p className="yup_input_error">{errors["name"]?.message}</p>
                </div>
                <div className="yup_section">
                    <label className="yup_label" htmlFor="media">
                        Media
                    </label>
                    <input
                        placeholder="paste in url"
                        errors={errors}
                        {...register("media")}
                        name="media"
                        onChange={(e) => setHiddenImage(e.currentTarget.value)}
                        type="url"
                        className="yup_input"
                    ></input>
                    <p className="yup_input_error">{errors["media"]?.message}</p>
                </div>
                <ImageRegister
                    imageArray={imageArray}
                    setImageArray={setImageArray}
                    hiddenImage={hiddenImage}
                />
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
                <div className="yup_section">
                    <label className="yup_label" htmlFor="street">
                        Street
                    </label>
                    <input
                        errors={errors}
                        {...register("street")}
                        type={"text"}
                        name="street"
                        className="yup_input"
                        value={street}
                    ></input>
                    <p className="yup_input_error">{errors["street"]?.message}</p>
                </div>
                <div className="yup_section">
                    <label className="yup_label" htmlFor="city">
                        City
                    </label>
                    <input
                        errors={errors}
                        {...register("city")}
                        type={"text"}
                        name="street"
                        className="yup_input"
                        value={city}
                    ></input>
                    <p className="yup_input_error">{errors["city"]?.message}</p>
                </div>
                <div className="yup_section">
                    <label className="yup_label" htmlFor="zip">
                        Zip
                    </label>
                    <input
                        errors={errors}
                        {...register("zip")}
                        type={"text"}
                        name="zip"
                        className="yup_input"
                        value={zip}
                    ></input>
                    <p className="yup_input_error">{errors["zip"]?.message}</p>
                </div>
                <div className="yup_section">
                    <label className="yup_label" htmlFor="country">
                        Country
                    </label>
                    <input
                        errors={errors}
                        {...register("country")}
                        type={"text"}
                        name="country"
                        className="yup_input"
                        value={zip}
                    ></input>
                    <p className="yup_input_error">{errors["country"]?.message}</p>
                </div>
                <div className="yup_section">
                    <label className="yup_label" htmlFor="country">
                        Continent
                    </label>
                    <input
                        errors={errors}
                        {...register("continent")}
                        type={"text"}
                        name="continent"
                        className="yup_input"
                        value={continent}
                    ></input>
                    <p className="yup_input_error">{errors["continent"]?.message}</p>
                </div>
            </div>
            <InformationRegister register={register} />
            <div className={styles.register_venue_div_submit}>
                {success ? (
                    <p className={styles.register_venue_div_submit_success}>
                        You have setSuccessfully submitted a venue
                    </p>
                ) : (
                    <button
                        onClick={(e) => preventDialogClose(e)}
                        className={styles.register_venue_submit_button}
                    >
                        submit
                    </button>
                )}
                {error && !success && (
                    <p className={styles.register_venue_div_submit_error}>{error}</p>
                )}
            </div>
        </form>
    );
}
export default RegisterVenue;
