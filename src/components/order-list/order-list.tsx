import styles from './order-list.module.css';
import {FC, ReactNode} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderList: FC = () => {

    return (
        <section className={`${styles.main}`}>
            <div className={`${styles.center} text_type_digits-default`}>#4234223</div>
            <header className='text text_type_main-medium mt-10'>Blackhole  Singularity острый бургер</header>
            <div className={`${styles.acent} text text_type_main-default mt-3`}>Выполнен</div>
            <div className='text text_type_main-medium mt-15'>Состав:</div>
            <section className={`${styles.container} mt-6`}>
                <li className='mb-4'><span className={`${styles.icon}`}><img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/></span><span className={`${styles.text} text text_type_main-default ml-4`}>Филе Люминесцентного тетраодонтимформа</span><span className={`${styles.spacer}`}/><span className='text text_type_digits-medium'>2x20 <CurrencyIcon type="primary" /></span></li>
                <li className='mb-4'><span className={`${styles.icon}`}><img src='https://code.s3.yandex.net/react/code/sauce-04-mobile.png'/></span><span className={`${styles.text} text text_type_main-default ml-4`}>Филе Люминесцентного тетраодонтимформа</span><span className={`${styles.spacer}`}/><span className='text text_type_digits-medium'>2x20 <CurrencyIcon type="primary" /></span></li>
            </section>
            <div className={`${styles.footer} mt-10`}>
                <div className='text text_type_main-default text_color_inactive'>Вчера, 13:50 i-GMT+3</div>
                <div className='text text_type_digits-medium'>510 <CurrencyIcon type="primary" /></div>
            </div>
        </section>
    );
}
