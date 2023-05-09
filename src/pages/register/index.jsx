import styles from "../../styles/components/Register.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../api/registerUser";
import { user, setUser } from "../../states/state-functions";
import * as yup from "yup";
import { useState } from "react";

function Register() {
    const setLoggedInUser = setUser();
    const loggedInUser = user();
    const [isError, setIsError] = useState("");
    const studNoroff = /@stud\.noroff\.no/i;
    const registerSchema = yup.object({
        email: yup
            .string()
            .email()
            .required("Required")
            .matches(studNoroff, "Must be a @stud.noroff.no mail"),
        password: yup.string().min(8).required("Required"),
        name: yup.string().min(2).max(33),
        avatar: yup.string(),
        venueManager: yup.boolean(),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    return (
        <form
            className={styles.form_register}
            onSubmit={handleSubmit((data, e) => registerUser(data, setIsError, setLoggedInUser))}
        >
            <h1 className={styles.form_register_h1}>Create a Holidaze account</h1>
            <div className={styles.form_register_section}>
                <label className={styles.form_register_label} htmlFor="name">
                    Name
                </label>
                <input className={styles.form_register_input} {...register("name")} />
                <p className={styles.form_register_error}>{errors.name?.message}</p>
            </div>

            <div className={styles.form_register_section}>
                <label className={styles.form_register_label} htmlFor="email">
                    Email
                </label>
                <input
                    placeholder="example@stud.noroff.no"
                    className={styles.form_register_input}
                    {...register("email")}
                />
                <p className={styles.form_register_error}>{errors.email?.message}</p>
            </div>

            <div className={styles.form_register_section}>
                <label className={styles.form_register_label} htmlFor="avatar">
                    Profile Image
                </label>
                <input type="url" className={styles.form_register_input} {...register("avatar")} />
                <p className={styles.form_register_error}>{errors.avatar?.message}</p>
            </div>

            <div className={styles.form_register_section}>
                <label className={styles.form_register_label} htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    className={styles.form_register_input}
                    {...register("password")}
                />
                <p className={styles.form_register_error}>{errors.password?.message}</p>
            </div>

            <div>
                <p className={styles.form_p_block}>Do you plan to host a venue?</p>
                <div className={styles.form_radio_div}>
                    <label htmlFor="host">No</label>
                    <input
                        type="radio"
                        name="host"
                        value={false}
                        defaultChecked={true}
                        {...register("venueManager")}
                    />
                </div>
                <div className={styles.form_radio_div}>
                    <label htmlFor="host">Yes</label>
                    <input type="radio" name="host" value={true} {...register("venueManager")} />
                </div>

                <p className={styles.form_register_error}>{errors.host?.message}</p>
            </div>
            <p className={styles.form_register_error}>{isError}</p>
            {loggedInUser?.name ? (
                <p className={styles.form_register_success}>Sign up successful</p>
            ) : (
                ""
            )}
            <button className={styles.form_register_submit}>Sign up</button>
        </form>
    );
}

export default Register;
