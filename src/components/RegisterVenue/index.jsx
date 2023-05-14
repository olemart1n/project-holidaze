import styles from "../../styles/components/RegisterVenue.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineDelete } from "react-icons/md";

import * as yup from "yup";
import YupInput from "../YupInput";
function RegisterVenue() {
    const [hiddenImage, setHiddenImage] = useState();
    const [imageArray, setImageArray] = useState([]);
    const venueSchema = yup.object({
        name: yup.string().min(2).max(33),
        image: yup.array().required(),
        perk: yup.boolean(),
        address: yup.string(),
        city: yup.string(),
        zip: yup.string().min(4),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(venueSchema),
    });

    const onSubmit = (data) => {
        let imageArray = [];
        imageArray.push(data.image);
        console.log(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <YupInput
                placeholder="give your venue a name"
                errors={errors}
                register={register}
                inputName={"name"}
            />
            <YupInput errors={errors} register={register} inputName={"zip"} />
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
            <h3 onClick={() => console.log(imageArray)}>helloooooooo</h3>
            <YupInput errors={errors} register={register} inputName={"address"} />
            <button>submit</button>
        </form>
    );
}

export default RegisterVenue;
