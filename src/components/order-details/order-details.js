import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';
import {postOrder} from "../../utils/api";
import React, {useContext, useEffect, useState} from "react";
import {BurgerContext} from "../../services/user-context";

function OrderDetails() {
    const [loaderState, setLoaderState] = useState({
        isLoading: false,
        hasError: false,
        data: {}
    });
    const {data: result, isLoading, hasError} = loaderState;
    const orderNum = result && result.order && result.order.number;

    const {ingredients, bun, orderReducer} = useContext(BurgerContext);
    const [orderState, orderDispatch] = orderReducer;

    //устанваливаем state в компонент BurgerConstructor
    useEffect(() => {
        orderDispatch({type: 'order', orderNum});
    }, [orderNum]);

    useEffect(() => {
        const ingredientIds = ingredients.map(item => item._id);
        const bunId = bun._id;
        const params = {
            ingredients: [bunId, ...ingredientIds, bunId]
        };
        postOrder({loaderState, setLoaderState, params});
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
