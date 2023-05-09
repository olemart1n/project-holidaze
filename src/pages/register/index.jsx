import styles from "../../styles/components/Register.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../api/registerUser";
import * as yup from "yup";

function Register() {
    const studNoroff = /@stud\.noroff\.no/i;
    const registerSchema = yup.object({
        email: yup
            .string()
            .email()
            .required("Required")
            .matches(studNoroff, "Must be a @stud.noroff.no mail"),
        password: yup.string().min(3).required("Required"),
        name: yup.string().min(2).max(33),
        avatar: yup.string(),
        host: yup.boolean(),
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
            onSubmit={handleSubmit((data, e) => registerUser(data, e))}
        >
            <h1>Create a Holidaze account</h1>
            <div className={styles.form_register_section}>
                <label className={styles.form_register_label} htmlFor="name">
                    Name
                </label>
                <input className={styles.form_login_input} {...register("name")} />
                <p className={styles.form_register_error}>{errors.name?.message}</p>
            </div>

            <div className={styles.form_register_section}>
                <label className={styles.form_register_label} htmlFor="email">
                    Email
                </label>
                <input className={styles.form_login_input} {...register("email")} />
                <p className={styles.form_register_error}>{errors.email?.message}</p>
            </div>

            <div className={styles.form_register_section}>
                <label className={styles.form_register_label} htmlFor="avatar">
                    Profile Image
                </label>
                <input className={styles.form_login_input} {...register("avatar")} />
                <p className={styles.form_register_error}>{errors.avatar?.message}</p>
            </div>

            <div className={styles.form_login_section}>
                <label className={styles.form_login_label} htmlFor="password">
                    Password
                </label>
                <input className={styles.form_login_input} {...register("password")} />
                <p className={styles.form_login_error}>{errors.password?.message}</p>
            </div>
            <div>
                <p>Do you plan to host a venue?</p>
                <label htmlFor="host">No</label>

                <input
                    type="radio"
                    name="host"
                    value={false}
                    defaultChecked={true}
                    {...register("host")}
                ></input>

                <label htmlFor="host">Yes</label>

                <input type="radio" name="host" value={true} {...register("host")}></input>

                <p className={styles.form_login_error}>{errors.host?.message}</p>
            </div>
            <button className={styles.form_register_submit}>Submit</button>
        </form>
    );
}

export default Register;
