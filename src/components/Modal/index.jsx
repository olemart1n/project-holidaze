import styles from "../../styles/components/Modal.module.css";
import { VscChromeClose } from "react-icons/vsc";
import { createPortal } from "react-dom";

function Modal({ isOpen, children, close }) {
    if (!isOpen) {
        return null;
    }
    return createPortal(
        <>
            <div className={styles.modal_overlay} onClick={close}>
                <div className={styles.modal_styles}>
                    <div className={styles.modal_close_div}>
                        <VscChromeClose className={styles.modal_close_button} onClick={close} />
                    </div>
                    <div className={styles.modal_content}>{children}</div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}
export default Modal;
