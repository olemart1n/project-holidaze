import styles from "../../styles/components/Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../features/schema/loginschema";
import { login } from "../../api/login";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { closeDialog, preventDialogClose } from "../../features/dialogs";
import {
    user,
    setUser,
    hostUser,
    setHostUser,
    setHostedVenues,
    setBookedByUser,
    isLoading,
    setIsLoading,
} from "../../states/state-functions";
import YupInput from "../YupInput";

function Login() {
    const navigate = useNavigate();
    const loading = isLoading();
    const setLoading = setIsLoading();
    const setHost = setHostUser();
    const setLoggedInUser = setUser();
    const setHostVenues = setHostedVenues();
    const setUserBookings = setBookedByUser();
    const loggedInUser = user();
    const loggedInHost = hostUser();
    const [isError, setIsError] = useState("");
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                loggedInHost?.name && navigate("/host");
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
                    setUserBookings
                )
            )}
        >
            <h2 className={styles.form_login_h2}>Login</h2>
            <YupInput errors={errors} register={register} inputName={"email"} type={"email"} />
            <YupInput
                errors={errors}
                register={register}
                inputName={"password"}
                type={"password"}
            />
            <p className={styles.form_login_error}>{isError}</p>
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
