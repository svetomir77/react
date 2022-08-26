import styles from './order-confirm.module.css';
import React, {FC, useEffect} from "react";
import {placeOrder} from "../../services/slices/order-details";
import {removeAllIngredients} from "../../services/slices/burger";
import {TIngredient} from "../../utils/types";
import {useDispatch, useSelector} from "../../services/store";
import {useAuth} from "../../services/auth";

export const OrderConfirm: FC = () => {
    const dispatch = useDispatch();
    const {getUser} = useAuth();

    const {ingredients, bun, isLoading, hasError, orderNum, accessToken} = useSelector((store) => {
        return {
            ingredients: store.burger.ingredients,
            bun: store.burger.bun,
            isLoading: store.order.isLoading,
            hasError: store.order.hasError,
            orderNum: store.order.num,
            accessToken: store.auth.accessToken,
        }
    });

    const auth = async () => {
        await getUser();
    };

    useEffect(() => {
        const order = function () {
            const ingredientIds = ingredients.map((item: TIngredient) => item._id);
            const bunId = bun._id;
            const body = {
                ingredients: [bunId, ...ingredientIds, bunId]
            };
            const params = {token: accessToken, body: body};
            dispatch(placeOrder(params));
        }
        if (!accessToken) {
            auth();
        } else {
            order();
        }

    }, [accessToken]);

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
