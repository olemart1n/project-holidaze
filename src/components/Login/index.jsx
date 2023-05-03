import styles from "../../styles/components/Login.module.css";

function Login() {
    return (
        <form className={styles.form_login}>
            <h1>Login</h1>
            <input type="email" placeholder="stud.noroff email"></input>
            <input type="password" placeholder="password"></input>
        </form>
    );
}

export default Login;
