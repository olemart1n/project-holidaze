import styles from "../../styles/components/InformationRegister.module.css";
import { TbCurrencyKroneSwedish } from "react-icons/tb";

function InformationRegister({ register }) {
    // if (!register) {
    //     register = (arg) => {
    //         arg = false;
    //     };
    // }
    return (
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

                <TbCurrencyKroneSwedish className={styles.register_venue_information_1_kroner} />
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
                <input type="radio" name="parking" value={true} {...register("parking")}></input>
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
    );
}

export default InformationRegister;
