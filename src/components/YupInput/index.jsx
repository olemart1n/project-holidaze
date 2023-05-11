import styles from "../../styles/components/YupInput.module.css";

function YupInput({ register, errors, inputName, type, placeholder }) {
    return (
        <div className={styles.yup_section}>
            <label className={styles.yup_label} htmlFor={inputName}>
                {inputName}
            </label>
            <input
                placeholder={placeholder}
                type={type}
                className={styles.yup_input}
                {...register(inputName)}
            ></input>
            <p className={styles.yup_input_error}>{errors[inputName]?.message}</p>
        </div>
    );
}

export default YupInput;
