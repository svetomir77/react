import styles from './order-details.module.css';
import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {placeOrder} from "../../services/slices/order-details";
import {removeAllIngredients} from "../../services/slices/burger";
import {TIngredient} from "../../utils/types";
import {AppDispatch} from "../../index";

export const OrderDetails: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {ingredients, bun, isLoading, hasError, orderNum} = useSelector((store: any) => {
        return {
            ingredients: store.burger.ingredients,
            bun: store.burger.bun,
            isLoading: store.order.isLoading,
            hasError: store.order.hasError,
            orderNum: store.order.num,
        }
    });

    useEffect(() => {
        const ingredientIds = ingredients.map((item: TIngredient) => item._id);
        const bunId = bun._id;
        const params = {
            ingredients: [bunId, ...ingredientIds, bunId]
        };
        // @ts-ignore
        dispatch(placeOrder(params));
    }, []);

    useEffect(() => {
        if (orderNum) {
            dispatch(removeAllIngredients());
        }
    }, [orderNum]);

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
                    <section className={`${styles.text} text text_type_digits-large mt-30`}>{orderNum}</section>
                    <section className='text text_type_main-medium mt-8'>идентификатор заказа</section>
                    <section className={`${styles.check} mt-15 mb-15`}></section>
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
