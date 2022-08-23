import styles from "./feed.module.css";
import React, {FC} from "react";
import {OrderInfo} from "../../components/order-info/order-info";

export const FeedPage: FC = () => {

    return (
        <section className={styles.main}>
            <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>
                <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
                <section className={`${styles.leftContainer} scroller`}>
                    <OrderInfo/>
                    <OrderInfo/>
                    <OrderInfo/>
                    <OrderInfo/>
                </section>
            </section>
            <section className={`${styles.colRight} mt-25`}>
                <section className={`${styles.orderCols}`}>
                    <section className={`${styles.orderLeft}`}>
                        <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                        <ul className={`${styles.done} text text_type_digits-default`}>
                            <li className='mb-2'>12312312</li>
                            <li className='mb-2'>12312312</li>
                            <li className='mb-2'>12312312</li>
                            <li className='mb-2'>12312312</li>
                        </ul>
                    </section>
                    <section className={`${styles.orderRight}`}>
                        <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                        <ul className={`${styles.inProgress} text text_type_digits-default`}>
                            <li className='mb-2'>12312312</li>
                            <li className='mb-2'>12312312</li>
                            <li className='mb-2'>12312312</li>
                        </ul>
                    </section>
                </section>
                <section className='mt-9'>
                    <p className='text text_type_main-medium'>Выполнено за всё время:</p>
                    <p className='text text_type_digits-large'>3342342</p>
                    <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
                    <p className='text text_type_digits-large'>3342</p>
                </section>
            </section>
        </section>
    );
}
