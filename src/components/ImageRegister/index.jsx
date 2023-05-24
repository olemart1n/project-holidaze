import styles from "../../styles/components/ImageRegister.module.css";
import { MdOutlineDelete } from "react-icons/md";
function ImageRegister({ imageArray, setImageArray, hiddenImage }) {
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
        <div>
            <img
                className={styles.image_register_hidden}
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
            <div className={styles.image_register_images_section}>
                {imageArray.map((image, index) => (
                    <div className={styles.image_register_image_div} key={index}>
                        <img
                            alt="image of venue"
                            src={image}
                            className={styles.image_register_image_image}
                        ></img>
                        <button
                            onClick={(e) => removeArrayImage(e)}
                            type="button"
                            className={styles.image_register_image_delete_button}
                            id={index}
                        >
                            <MdOutlineDelete
                                className={styles.image_register_image_delete_button_icon}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageRegister;
