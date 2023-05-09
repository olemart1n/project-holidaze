import styles from "../../styles/components/Login.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../api/login";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { closeDialog } from "../../features/dialogs";
import { user, setUser } from "../../states/state-functions";
import { useNavigate } from "react-router-dom";

function Login() {
    const setLoggedInUser = setUser();
    const loggedInUser = user();
    const [isError, setIsError] = useState("");
    const studNoroff = /@stud\.noroff\.no/i;
    const loginSchema = yup.object({
        email: yup
            .string()
            .email()
            .required("Required")
            .matches(studNoroff, "Must be a @stud.noroff.no mail"),
        password: yup.string().min(3).required("Required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const preventDialogClose = (e) => {
        e.stopPropagation();
    };
    return (
        <form
            className={styles.form_login}
            onSubmit={handleSubmit((data) => login(data, setIsError, setLoggedInUser))}
        >
            <h2 className={styles.form_login_h2}>Login</h2>
            <div className={styles.form_login_section}>
                <label className={styles.form_login_label} htmlFor="email">
                    Email
                </label>
                <input className={styles.form_login_input} {...register("email")} />
                <p className={styles.form_login_error}>{errors.email?.message}</p>
            </div>
            <div className={styles.form_login_section}>
                <label className={styles.form_login_label} htmlFor="email">
                    Password
                </label>
                <input className={styles.form_login_input} {...register("password")} />
                <p className={styles.form_login_error}>{errors.password?.message}</p>
            </div>
            <p className={styles.form_login_error}>{isError}</p>
            {loggedInUser?.name ? (
                <p className={styles.form_login_success}>Login Successful</p>
            ) : (
                ""
            )}
            <button onClick={(e) => preventDialogClose(e)} className={styles.form_login_submit}>
                Submit
            </button>
            <Link to="register" onClick={closeDialog} className={styles.form_register_button}>
                Create account
            </Link>
        </form>
    );
}

export default Login;
