import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';
import {postOrder} from "../../utils/api";
import React, {useContext, useEffect, useState} from "react";
import {BurgerContext} from "../../utils/user-context";

function OrderDetails() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });
    const {data, isLoading, hasError} = state;
    const orderNum = data && data.order && data.order.number;

    const {list, bun, orderReducer} = useContext(BurgerContext);
    const [orderState, orderDispatch] = orderReducer;

    //устанваливаем state в компонент BurgerConstructor
    useEffect(() => {
        orderDispatch({type: 'order', orderNum});
    }, [orderNum]);

    useEffect(() => {
        const ingredientIds = list.map(item => item._id);
        const bunId = bun._id;
        const params = {
            ingredients: [...ingredientIds, bunId, bunId]
        };
        postOrder({state, setState, params});
    }, []);

    return (
        <>
            {isLoading && <div className="centerText">Сохранение...</div>}
            {
                hasError && <div className="centerText error">{hasError}</div>
            }
            {
                !isLoading &&
                !hasError &&
                orderNum &&
                <>
                    <section className='text text_type_digits-large mt-30'>{orderNum}</section>
                    <section className='text text_type_main-medium mt-8'>идентификатор заказа</section>
                    <section className={`${styles.check} mt-15 mb-15`}><CheckMarkIcon type="primary"/></section>
                    <section className='text text_type_main-small bt-2'>Ваш заказ начали готовить</section>
                    <section className='text text_type_main-small text_color_inactive'>Дождитесь готовности на
                        орбитальной
                        станции
                    </section>
                </>
            }
        </>
    );
}

export default OrderDetails;
