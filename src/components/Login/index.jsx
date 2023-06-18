import styles from "../../styles/components/Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../features/schema/loginschema";
import { login } from "../../api";
import { Link } from "react-router-dom";
import Loader from "../loader";
import { closeDialog, preventDialogClose } from "../../features/dialogs";
import {
    user,
    setUser,
    hostUser,
    setHostUser,
    setHostedVenues,
    setBookedByUser,
    setAvatar,
    setIsLoading,
} from "../../states/state-functions";

function Login() {
    const navigate = useNavigate();
    const setLoading = setIsLoading();
    const setHost = setHostUser();
    const setLoggedInUser = setUser();
    const setHostVenues = setHostedVenues();
    const setUserBookings = setBookedByUser();
    const setUserAvatar = setAvatar();
    const loggedInUser = user();
    const loggedInHost = hostUser();
    const [isError, setIsError] = useState("");
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                loggedInHost?.name && navigate("/profile");
                loggedInUser?.name && navigate("/");
                setLoading(false);
            }, 2500);
        }
    }, [success]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    return (
        <form
            className={styles.form_login}
            onSubmit={handleSubmit((data) =>
                login(
                    data,
                    setIsError,
                    setSuccess,
                    setLoading,
                    setLoggedInUser,
                    setHost,
                    setHostVenues,
                    setUserBookings,
                    setUserAvatar
                )
            )}
        >
            <h2 className={styles.form_login_h2}>Login</h2>
            <div className="yup_section">
                <label className="yup_label" htmlFor="email">
                    Email
                </label>
                <input
                    errors={errors}
                    {...register("email")}
                    type={"email"}
                    className="yup_input"
                ></input>
                <p className="yup_input_error">{errors["email"]?.message}</p>
            </div>
            <div className="yup_section">
                <label className="yup_label" htmlFor="password">
                    Password
                </label>
                <input
                    errors={errors}
                    {...register("password")}
                    type={"password"}
                    className="yup_input"
                />
                <p className="yup_input_error">{errors["password"]?.message}</p>
                <p className={styles.form_login_error}>{isError}</p>
            </div>

            {success && (
                <div>
                    <Loader />
                    <p className={styles.form_login_success}>Login Successful</p>
                </div>
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
