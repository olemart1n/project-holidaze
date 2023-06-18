import Loader from "../../components/Loader";
import styles from "../../styles/components/UserProfile.module.css";
import DialogHeader from "../../components/DialogHeader";
import { user, hostUser, setUser, setHostUser } from "../../states/state-functions";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { closeFunctionality } from "../../features/dialogs";
import { useEffect, useRef, useState } from "react";
import { getHostStatus, editAvatar } from "../../api";
import { useNavigate } from "react-router-dom";
import { save, remove } from "../../features/storage";
import { FaUserEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
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
    const avatarModal = useRef(null);
    const errorMessage = useRef(null);
    const [avatarImage, setAvatarImage] = useState(profile.avatar);

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

    const removeImg = (e) => {
        e.currentTarget.style.display = "none";
        errorMessage.current.innerHTML = "please use a valid image url";
        setTimeout(() => {
            errorMessage.innerHTML = "";
        }, 4000);
    };

    const displayImg = (e) => {
        e.currentTarget.style.display = "block";
        e.currentTarget.innerHTML = "error";
    };

    const submitAvatar = (e) => {
        const newObj = { ...profile };
        editAvatar(profile, avatarImage);
        if (profile.venueManager) {
            newObj.avatar = avatarImage;
            setHost(newObj);
            save("hostUser", newObj);
        } else {
            newObj.avatar = avatarImage;
            setHost(newObj);
            setLoggedInUser("user", newObj);
        }
        setTimeout(() => {
            avatarModal.current.close();
        }, 300);
    };
    return (
        <main>
            <Helmet>
                <title>Holidaze | Profile</title>
                <meta name="description" content="Profile" />
            </Helmet>
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
                <div>
                    <button
                        className={styles.profile_update_avatar_button}
                        onClick={() => avatarModal.current.showModal()}
                    >
                        <p>Edit</p> <FaUserEdit />
                    </button>
                </div>
            </div>
            <dialog ref={signUpModal} className="small_modal" onClick={closeFunctionality}>
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
            <dialog
                ref={avatarModal}
                className={styles.profile_avatar_modal}
                onClick={closeFunctionality}
            >
                <DialogHeader />
                <div className={styles.profile_avatar_modal_content}>
                    <h4>Change avatar</h4>
                    <input
                        id="avatar-image-input"
                        type="url"
                        className={styles.profile_avatar_modal_input}
                        onChange={(e) => setAvatarImage(e.currentTarget.value)}
                    />
                    <p ref={errorMessage}></p>
                    <img
                        alt="Your profile avatar"
                        onError={removeImg}
                        onLoad={displayImg}
                        className={styles.profile_avatar_modal_img}
                        src={avatarImage}
                    ></img>
                    <button className={styles.profile_avatar_modal_submit} onClick={submitAvatar}>
                        Submit
                    </button>
                </div>
            </dialog>
        </main>
    );
}

export default UserProfile;
