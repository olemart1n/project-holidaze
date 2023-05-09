import styles from "../../styles/components/HtmlDialog.module.css";
import { closeDialog, extraCloseFunctionality } from "../../features/dialogs";
import { VscChromeClose } from "react-icons/vsc";
import { BsUiRadios } from "react-icons/bs";

function HtmlDialog({ children, type }) {
    let styling;
    if (type === "image") {
        styling = styles.html_modal_image;
    } else if (type === "login") {
        styling = styles.html_modal_login;
    }

    return (
        <dialog data-modal id="html_modal" className={styling} onClick={extraCloseFunctionality}>
            <div className={styles.modal_wrapper}>
                <div className={styles.modal_close_div}>
                    <button
                        type="button"
                        formMethod="dialog"
                        onClick={closeDialog}
                        className={styles.modal_close_button}
                    >
                        <VscChromeClose className={styles.modal_close_button_icon} />
                    </button>
                </div>
                <div className={styles.modal_content_children}>{children}</div>
            </div>
        </dialog>
    );
}

export default HtmlDialog;
