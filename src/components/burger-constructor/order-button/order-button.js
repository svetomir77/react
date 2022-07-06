import React, {useContext, useEffect, useState} from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderButton from "./order-button.module.css";
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import {useDispatch, useSelector} from "react-redux";
import {getTotal} from "../../../services/slices/order-details";

function OrderButton () {
    const [modalState, setModalState] = useState({
        visible: false
    });
    const dispatch = useDispatch();
    const {bun, ingredients, total} = useSelector((store) => {
        return {
            bun: store.burger.bun,
            ingredients: store.burger.ingredients,
            total: store.order.total,
        }
    });
    useEffect(() => {
        dispatch(getTotal({bun, ingredients}));
    }, [bun, ingredients]);

    const handleOpenModal = () => {
        setModalState({...modalState, visible: true });
    }
    const handleCloseModal = () => {
        setModalState({...modalState, visible: false });
    }
    return (
        <section className={`${orderButton.main} mt-10`}>
            <span className={`${orderButton.price} mr-10`}><span className='text text_type_digits-medium p-1'>{total}</span> <CurrencyIcon type="primary" /></span>
            <Button type="primary" size="medium" onClick={handleOpenModal}>
                Оформить заказ
            </Button>
            {modalState.visible && <Modal width={720} height={720} onClose={handleCloseModal}><OrderDetails/></Modal>}
        </section>
    )
}

export default OrderButton;
