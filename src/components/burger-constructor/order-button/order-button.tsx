import React, {useEffect, useState} from 'react';
import {Button as ButtonUI, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderButton from "./order-button.module.css";
import {Modal} from '../../modal/modal';
import {OrderDetails} from '../../order-details/order-details';
import {useDispatch, useSelector} from "react-redux";
import {getTotal} from "../../../services/slices/order-details";
import {useAuth} from "../../../services/auth";
import {useHistory} from "react-router-dom";
import {TButton, TOnClose} from "../../../utils/types";

const Button: TButton = ButtonUI;

function OrderButton() {
    type TModal = {
        visible: boolean;
    }
    const [modalState, setModalState] = useState<TModal>({
        visible: false
    });
    const dispatch = useDispatch();
    const {bun, ingredients, total} = useSelector((store: any) => {
        return {
            bun: store.burger.bun,
            ingredients: store.burger.ingredients,
            total: store.order.total,
        }
    });

    useEffect(() => {
        dispatch(getTotal({bun, ingredients}));
    }, [bun, ingredients, dispatch]);

    const {logged} = useAuth();

    const history = useHistory();

    const handleOpenModal = () => {
        if (logged) {
            setModalState({...modalState, visible: true});
        } else {
            history.push('/login');
        }
    }
    const handleCloseModal: TOnClose = () => {
        setModalState({...modalState, visible: false});
    }
    return (
        <section className={`${orderButton.main} mt-10`}>
            <span className={`${orderButton.price} mr-10`}><span
                className='text text_type_digits-medium p-1'>{total}</span> <CurrencyIcon type="primary"/></span>
            <Button type="primary" size="medium" onClick={handleOpenModal}
                    disabled={(!ingredients.length || !bun.name)}>
                Оформить заказ
            </Button>
            {modalState.visible && <Modal width={720} height={720} onClose={handleCloseModal}><OrderDetails/></Modal>}
        </section>
    )
}

export default OrderButton;
