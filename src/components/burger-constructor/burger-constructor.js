import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from "./burger-constructor.module.css";
import BurgerStructure from "./structure/structure";
import OrderButton from './order-button/order-button';
import dataTypes from '../../utils/data-types.js';
import ingredientTypes from "../../utils/ingredient-types";

class BurgerConstructor extends React.Component {
    render() {
        return (
            <section className={burgerConstructor.main}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${this.props.bun.name} (верх)`}
                    price={this.props.bun.price}
                    thumbnail={this.props.bun.image}
                />
                <section className={`${burgerConstructor.scrollWrap} scroller`}>
                    <BurgerStructure data={this.props.data.filter(item => item.type !== 'bun')} className={burgerConstructor.item}/>
                </section>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${this.props.bun.name} (низ)`}
                    price={this.props.bun.price}
                    thumbnail={this.props.bun.image}
                />
                <OrderButton/>
            </section>
        )
    }
}

BurgerConstructor.propTypes = {
    data: dataTypes,
    bun: ingredientTypes.isRequired,
};

export default BurgerConstructor;
