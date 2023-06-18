import React, { useRef } from "react";
import Login from "../../login";
import styles from "../../../styles/header/GuestNav.module.css";
import { closeFunctionality } from "../../../features/dialogs";
import DialogHeader from "../../dialogHeader";
import HolidazeLogo from "../holidazeLogo";

function GuestNav() {
    const loginModal = useRef(null);
    return (
        <nav>
            <HolidazeLogo />

            <button
                className={styles.userNav_auth}
                onClick={() => {
                    loginModal.current.showModal();
                }}
            >
                <p>Login</p>
            </button>
            <dialog ref={loginModal} className="small_dialog" onClick={closeFunctionality}>
                <DialogHeader />
                <Login />
            </dialog>
        </nav>
    );
}

export default GuestNav;
