import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from "./burger_constructor.module.css";
import BurgerStructure from "./structure/structure";
import OrderButton from './order_button/order_button';
import dataTypes from '../../utils/data_types.js';

class BurgerConstructor extends React.Component {
    render() {
        return (
            <section className={burgerConstructor.main}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={this.props.bun.name}
                    price={this.props.bun.price}
                    thumbnail={this.props.bun.image}
                />
                <section className={`${burgerConstructor.scrollWrap} scroller`}>
                    <BurgerStructure data={this.props.data.filter(item => item.type !== 'bun')} className={burgerConstructor.item}/>
                </section>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={this.props.bun.name}
                    price={this.props.bun.price}
                    thumbnail={this.props.bun.image}
                />
                <OrderButton/>
            </section>
        )
    }
}

BurgerConstructor.propTypes = dataTypes;

export default BurgerConstructor;
