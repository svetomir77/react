import ReactDOM from 'react-dom';
import {useEffect} from "react";
import ModalOverlay from './modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

function Modal(props) {
    const {children, title, onClose} = props;
    const width = props.width || 500;
    const height = props.height || 500;
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const close = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, []);

    return ReactDOM.createPortal(
        <>
            <section className={styles.container}>
                <section className={styles.window} style={{height: height + 'px', width: width + 'px'}}>
                    <h2 className='mt-10 ml-10 text text_type_main-large'>{title}<span
                        className={`${styles.closeIcon} icon mt-10 mr-10`} onClick={onClose}><CloseIcon type="primary"/></span>
                    </h2>
                    <main className={styles.body}>
                        {children}
                    </main>
                </section>
            </section>
            <ModalOverlay onClose={onClose}/>
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default Modal;
