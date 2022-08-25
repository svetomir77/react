import styles from './order-list.module.css';
import {FC, useEffect} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder} from "../../utils/types";
import {getStatus} from "../../utils/common";
import moment from "moment";
import {useDispatch, useSelector} from "../../index";
import {feedActions} from "../../services/slices/feed";
import {fetchIngredients} from "../../services/slices/ingredients";

moment.locale('ru');

export const OrderList: FC<{ order: TOrder }> = ({order}) => {
    const dispatch = useDispatch();
    const {selected, ingredients, orders} = useSelector((store) => {
        return {
            selected: store.feed.selected,
            ingredients: store.ingredients.items,
            orders: store.feed.orders,
        }
    });

    useEffect(() => {
        if (!ingredients) {
            dispatch(fetchIngredients());
        }
        if (orders && orders.length && ingredients && ingredients.length) {
            dispatch(feedActions.select({id: order.number, orders: orders, ingredients: ingredients}));
        }
    }, [orders, ingredients]);

    return (
        selected && <section className={`${styles.main}`}>
            <div className={`${styles.center} text_type_digits-default`}>#{selected.number}</div>
            <header className='text text_type_main-medium mt-10'>{selected.name}</header>
            <div className={`${styles.acent} text text_type_main-default mt-3`}>{getStatus(selected.status)}</div>
            <div className='text text_type_main-medium mt-15'>Состав:</div>
            <section className={`${styles.container} mt-6 scroller`}>
                {selected.ingredients.map((item, index) => (
                    <li className='mb-4' key={index}><span className={`${styles.icon}`}><img
                        src={typeof item !== "string" ? item?.image_mobile : ''}/></span><span
                        className={`${styles.text} text text_type_main-default ml-4`}>{typeof item !== "string" ? item?.name : ''}</span><span
                        className={`${styles.spacer}`}/><span
                        className='text text_type_digits-medium'>{typeof item !== "string" ? item?.price : ''}
                        <CurrencyIcon type="primary"/></span></li>
                ))
                }
            </section>
            <div className={`${styles.footer} mt-10`}>
                <div
                    className='text text_type_main-default text_color_inactive'>{selected.createdAt ? moment(selected.createdAt).calendar() : ''}</div>
                <div className='text text_type_digits-medium'>{selected.price} <CurrencyIcon type="primary"/></div>
            </div>
        </section>
    );
}
