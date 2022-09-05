import React, {useEffect, useState} from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderButton from "./order-button.module.css";
import {Modal} from '../../modal/modal';
import {OrderConfirm} from '../../order-confirm/order-confirm';
import {getTotal} from "../../../services/slices/order-details";
import {useAuth} from "../../../services/auth";
import {useHistory, useLocation} from "react-router-dom";
import {LocationState, TOnClose} from "../../../utils/types";
import {useDispatch, useSelector} from "../../../services/store";
import {Button} from "../../Button";


function OrderButton() {
    type TModal = {
        visible: boolean;
    }
    const [modalState, setModalState] = useState<TModal>({
        visible: false
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const state = location.state as LocationState;

    const {bun, ingredients, total} = useSelector((store) => {
        return {
            bun: store.burger.bun,
            ingredients: store.burger.ingredients,
            total: store.order.total,
        }
    });

    useEffect(() => {
        dispatch(getTotal({bun, ingredients}));
        if (state && state.modal) {
            setModalState({...modalState, visible: true});
            location.state = null;
        }
    }, [bun, ingredients, dispatch, state]);

    const {logged} = useAuth();

    const handleOpenModal = () => {
        const newState = {...modalState, visible: true};
        if (logged) {
            setModalState({...modalState, visible: true});
        } else {
            history.push({
                pathname: '/login',
                state: {
                    modal: true
                }
            });
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
            {modalState.visible && <Modal width={720} height={720} onClose={handleCloseModal}><OrderConfirm/></Modal>}
        </section>
    )
}

export default OrderButton;
