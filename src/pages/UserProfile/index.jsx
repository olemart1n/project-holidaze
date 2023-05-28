import Loader from "../../components/Loader";
import styles from "../../styles/components/UserProfile.module.css";
import DialogHeader from "../../components/DialogHeader";
import { user, hostUser, setUser, setHostUser } from "../../states/state-functions";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { closeFunctionality } from "../../features/dialogs";
import { useEffect, useRef, useState } from "react";
import { getHostStatus } from "../../api/getHostStatus";
import { useNavigate } from "react-router-dom";
import { save, remove } from "../../features/storage";
function UserProfile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const loggedInUser = user();
    const setLoggedInUser = setUser();
    const loggedInHost = hostUser();
    const setHost = setHostUser();
    let profile;
    if (loggedInHost.name) {
        profile = loggedInHost;
    } else {
        profile = loggedInUser;
    }
    const signUpModal = useRef(null);
    useEffect(() => {
        if (isLoading) {
            const newObject = { ...profile };
            newObject.venueManager = true;
            setHost(newObject);
            setLoggedInUser({});
            remove("user");
            save("hostUser", newObject);
            setTimeout(() => {
                navigate("/host/venue");
            }, 2500);
        }
    }, [isLoading]);
    return (
        <main>
            <h1 className={styles.profile_h1}>Your profile</h1>
            <div className={styles.profile_card}>
                <div className={styles.profile_image_div}>
                    <img className={styles.profile_image} src={profile?.avatar}></img>
                </div>
                <div className={styles.profile_info}>
                    <h3 className={styles.profile_name}>{profile.name}</h3>
                    <h4 className={styles.profile_email}>{profile.email}</h4>
                </div>

                {profile?.venueManager ? (
                    <div className={styles.profile_venueManager}>
                        <p>Venue Manager: </p>
                        <BsFillCheckCircleFill className={styles.profile_venueManager_icon} />
                    </div>
                ) : (
                    <div className={styles.profile_venueManager}>
                        <p>
                            {" "}
                            <button
                                className={styles.profile_venueManager_signUp}
                                onClick={() => signUpModal.current.showModal()}
                            >
                                Sign up
                            </button>
                            as Venue Manager to start host
                        </p>
                    </div>
                )}
            </div>
            <dialog
                ref={signUpModal}
                className={styles.profile_signUp_modal}
                onClick={closeFunctionality}
            >
                <DialogHeader />

                {!isLoading ? (
                    <div className={styles.profile_signUp_modal_div}>
                        <h3 className={styles.profile_signUp_modal_h3}>
                            To host a venue you must be registered as Venue Manager at Holidaze
                        </h3>

                        <h4 className={styles.profile_signUp_modal_h4}>
                            Click confirm to register
                        </h4>
                        <button
                            className={styles.profile_signUp_confirm}
                            onClick={() => {
                                getHostStatus(profile, setIsLoading);
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                ) : (
                    <Loader />
                )}
            </dialog>
        </main>
    );
}

export default UserProfile;
