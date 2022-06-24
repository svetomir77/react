import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

function OrderDetails () {
    return (
        <>
            <section className='text text_type_digits-large mt-30'>034536</section>
            <section className='text text_type_main-medium mt-8'>идентификатор заказа</section>
            <section className={`${styles.check} mt-15 mb-15`}><CheckMarkIcon type="primary" /></section>
            <section className='text text_type_main-small bt-2'>Ваш заказ начали готовить</section>
            <section className='text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</section>
        </>
    );
}

export default OrderDetails;
