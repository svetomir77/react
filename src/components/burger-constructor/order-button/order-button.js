import React, {useContext, useEffect, useState} from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderButton from "./order-button.module.css";
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import {BurgerContext} from "../../../services/user-context";

function OrderButton () {
    const {ingredients, bun, orderReducer} = useContext(BurgerContext);
    const [orderState, orderDispatch] = orderReducer;
    const [modalState, setModalState] = useState({
        visible: false
    });

    useEffect(() => {
        orderDispatch({type: 'total', ingredients, bun});
    }, [ingredients, bun]);

    const handleOpenModal = () => {
        setModalState({...modalState, visible: true });
    }
    const handleCloseModal = () => {
        setModalState({...modalState, visible: false });
    }
    return (
        <section className={`${orderButton.main} mt-10`}>
            <span className={`${orderButton.price} mr-10`}><span className='text text_type_digits-medium p-1'>{orderState.total}</span> <CurrencyIcon type="primary" /></span>
            <Button type="primary" size="medium" onClick={handleOpenModal}>
                Оформить заказ
            </Button>
            {modalState.visible && <Modal width={720} height={720} onClose={handleCloseModal}><OrderDetails/></Modal>}
        </section>
    )
}

export default OrderButton;
