import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Icons, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from "./burger_constructor.module.css";

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
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={this.props.bun.image}
                    />
                </section>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={this.props.bun.name}
                    price={this.props.bun.price}
                    thumbnail={this.props.bun.image}
                />
            </section>
        )
    }
}

export default BurgerConstructor;
