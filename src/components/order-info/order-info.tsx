import styles from './order-info.module.css';
import React, {FC, useEffect, useMemo} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {isDone, isPending, TIngredients, TOrder} from "../../utils/types";
import moment from "moment";
import 'moment/locale/ru';
import {useDispatch, useSelector} from "../../index";
import {fetchIngredients} from "../../services/slices/ingredients";

moment.locale('ru');

export const OrderInfo: FC<{ order: TOrder, showStatus:boolean }> = (props) => {
    const {order, showStatus} = props;
    const ingredientsData = useSelector((store) => store.ingredients.items);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ingredientsData.length) {
            dispatch(fetchIngredients());
        }
    }, [ingredientsData]);

    const status = (statusId: string) => {
        let status = 'Отменён';
        switch (order.status) {
            case isDone:
                status = 'Выполнен';
                break;
            case isPending:
                status = 'Готовится';
                break;
        }
        return status;
    }
    const structure:TIngredients = [];
    let more = 0;
    let price = 0;
    useMemo(() => {
        const total = order.ingredients.length;
        if (total) {
            order.ingredients.forEach(
                (id, index) => {
                    const [ingredient] = ingredientsData.filter(item => item._id === id);

                    if (ingredient) {
                        if (index < 6) {
                            structure.push(ingredient);
                        }
                        price += ingredient.price;
                    }
                });
            more = total - 6;
        }
    },
    [order.ingredients, ingredientsData]);

    return (
        <section className={`${styles.main} p-6`}>
            <div className={`${styles.top} text_type_digits-default`}><span>#{order.number}</span><span
                className='text text_type_main-default text_color_inactive'>{moment(order.createdAt).calendar()}</span>
            </div>
            <header className='text text_type_main-medium mt-6'>{order.name}</header>
            {showStatus && <div className={`text text_type_main-default mt-2 ${order.status}`}>{status(order.status)}</div>}
            <section className={`${styles.container} mt-6 ml-6`}>
                <ul className={`${styles.icons}`}>
                    {structure.map((ingredient, index) => (
                        <li className={`${styles.icon} ${(index === 5 ? 'counter' : '')}`} key={index} data-count={index === 5 && more > 0 ? `+${more}` : ''}>
                            <img src={ingredient.image_mobile}/>
                        </li>
                    ))}
                </ul>
                <div><span className={`${styles.price} text text_type_digits-default`}>{price} <CurrencyIcon
                    type="primary"/></span></div>
            </section>
        </section>
    );
}
