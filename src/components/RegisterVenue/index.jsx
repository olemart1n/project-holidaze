import styles from "../../styles/components/RegisterVenue.module.css";
import { useEffect, useState } from "react";
import LocationSearchInput from "../LocationSearchInput";
import { registerVenue } from "../../api";
import { hostUser, setHostedVenues, hostedVenues } from "../../states/state-functions";
import { save } from "../../features/storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import YupInput from "../YupInput";
import venueSchema from "../../features/schema/venueschema";
import ImageRegister from "../ImageRegister";
import InformationRegister from "../InformationRegister";
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

    const onSubmit = (data) => {
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
            onSubmit={handleSubmit((data) => onSubmit(data))}
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
            <InformationRegister register={register} />
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
    );
}
export default RegisterVenue;
