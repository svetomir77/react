import styles from './modal-overlay.module.css';
import {FC} from "react";
import {TOnClose} from "../../utils/types";

export const ModalOverlay:FC<{onClose:TOnClose}> = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
}
