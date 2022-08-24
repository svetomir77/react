import styles from "./feed.module.css";
import React, {FC, ReactNode, useEffect, useMemo} from "react";
import {OrderInfo} from "../../components/order-info/order-info";
import {feedActions} from "../../services/slices/feed";
import {useDispatch, useSelector} from "../../index";
import {isDone, isPending, TIngredient} from "../../utils/types";

export const FeedPage: FC = () => {
    const feedUrl = 'wss://norma.nomoreparties.space/orders/all';
    const dispatch = useDispatch();
    const {orders,
        total,
        totalToday,
        connecting,
        online,
        connectionError} = useSelector((store) => store.feed);
    useEffect(() => {
        dispatch(feedActions.wsConnect(feedUrl));
        return () => {
            dispatch(feedActions.wsDisconnect());
        }
    }, []);
    const readyOrders = useMemo(() => orders.filter((item) => item.status === isDone), [orders]);
    const inProgressOrders = useMemo(() => orders.filter((item) => item.status === isPending), [orders]);

    return (
        <section className={styles.main}>
            <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>
                <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
                <section className={`${styles.leftContainer} scroller`}>{
                    orders.map((order) => (
                        <OrderInfo key={order._id} order={order} showStatus={false}/>
                    ))
                }</section>
            </section>
            <section className={`${styles.colRight} mt-25`}>
                <section className={`${styles.orderCols}`}>
                    <section className={`${styles.orderLeft}`}>
                        <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                        <ul className={`${styles.done} text text_type_digits-default`}>
                            {readyOrders.map((order, index) => (
                                <li key={index}>{order.number}</li>
                            ))}
                        </ul>
                    </section>
                    <section className={`${styles.orderRight}`}>
                        <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                        <ul className={`${styles.inProgress} text text_type_digits-default`}>
                            {inProgressOrders.map((order) => (
                                <li key={order._id}>{order.number}</li>
                            ))}
                        </ul>
                    </section>
                </section>
                <section className='mt-9'>
                    <p className='text text_type_main-medium'>Выполнено за всё время:</p>
                    <p className='text text_type_digits-large'>{total}</p>
                    <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
                    <p className='text text_type_digits-large'>{totalToday}</p>
                </section>
            </section>
        </section>
    );
}
