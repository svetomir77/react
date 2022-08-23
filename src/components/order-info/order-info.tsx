import styles from './order-info.module.css';
import {FC} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderInfo: FC = () => {

    return (
        <section className={`${styles.main} p-6`}>
            <div className={`${styles.top} text_type_digits-default`}><span>#4234223</span><span className='text text_type_main-default text_color_inactive'>Вчера, 13:50 i-GMT+3</span></div>
            <header className='text text_type_main-medium mt-6'>Blackhole  Singularity острый бургер</header>
            <div className={`text text_type_main-default mt-2`}>Создан</div>
            <section className={`${styles.container} mt-6 ml-6`}>
                <ul className={`${styles.icons}`}>
                    <li className={`${styles.icon}`}><img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/></li>
                    <li className={`${styles.icon}`}><img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/></li>
                    <li className={`${styles.icon}`}><img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/></li>
                    <li className={`${styles.icon}`}><img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/></li>
                    <li className={`${styles.icon}`}><img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/></li>
                    <li className={`${styles.icon} counter`} data-count='+3'><img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/></li>
                </ul>
                <div><span className={`${styles.price} text text_type_digits-default`}>2x20 <CurrencyIcon type="primary" /></span></div>
            </section>
        </section>
    );
}
