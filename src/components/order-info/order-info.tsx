import styles from './order-info.module.css';
import React, {FC, useMemo, useState} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredients, TOrder} from "../../utils/types";
import moment from "moment";
import 'moment/locale/ru';
import {useSelector} from "../../services/store";
import {getStatus} from "../../utils/common";

moment.locale('ru');

export const OrderInfo: FC<{ order: TOrder, showStatus: boolean }> = (props) => {
    const {order, showStatus} = props;
    const ingredientsData = useSelector((store) => store.ingredients.items);
    const [structure, setStructure] = useState<{ list: TIngredients, more: number, price: number }>({
        list: [],
        more: 0,
        price: 0,
    });
    const {list, more, price} = structure;

    useMemo(() => {
            let price = 0;
            const total = order.ingredients.length;
            const data: TIngredients = [];

            if (total) {
                let counter = 0;
                order.ingredients.forEach(
                    (id, index) => {
                        const [ingredient] = ingredientsData.filter(item => item._id === id);

                        if (ingredient) {
                            const [existedIngredient] = data.filter(item => item._id === id);
                            if (!existedIngredient && counter < 6) {
                                data.push(ingredient);
                                counter++;
                            }
                            price += ingredient.price;
                        }
                    });
                setStructure({
                    list: data,
                    more: total - 6,
                    price: price,
                });
            }
        },
        [order, ingredientsData]);

    return (
        <section className={`${styles.main} p-6`}>
            <div className={`${styles.top} text_type_digits-default`}><span>#{order.number}</span><span
                className='text text_type_main-default text_color_inactive'>{moment(order.createdAt).calendar()}</span>
            </div>
            <header className='text text_type_main-medium mt-6'>{order.name}</header>
            {showStatus &&
            <div className={`text text_type_main-default mt-2 ${order.status}`}>{getStatus(order.status)}</div>}
            <section className={`${styles.container} mt-6 ml-6`}>
                <ul className={`${styles.icons}`}>
                    {list.map((ingredient, index) => (
                        <li className={`${styles.icon} ${(index === 5 ? 'counter' : '')}`} key={index}
                            data-count={index === 5 && more > 0 ? `+${more}` : ''}>
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
