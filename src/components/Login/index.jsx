import styles from "../../styles/components/Login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Login() {
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

    function onSubmit(data, e) {
        e.preventDefault();
        console.log(e);
        console.log(data);
    }

    return (
        <form className={styles.form_login} onSubmit={handleSubmit(onSubmit)}>
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
            <button className={styles.form_login_submit}>Submit</button>
        </form>
    );
}

export default Login;
