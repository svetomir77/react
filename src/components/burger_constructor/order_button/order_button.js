import React from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderButton from "./order_button.module.css";

class OrderButton extends React.Component {
    render() {
        return (
            <section className={`${orderButton.main} mt-10`}>
                <span className={`${orderButton.price} mr-10`}><span className='text text_type_digits-medium p-1'>{610}</span> <CurrencyIcon type="primary" /></span>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </section>
        )
    }
}

export default OrderButton;
