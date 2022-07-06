import React, {useMemo} from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from "./burger-constructor.module.css";
import BurgerStructure from "./structure/structure";
import OrderButton from './order-button/order-button';
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import { addIngredient, addBun } from '../../services/slices/burger';

function BurgerConstructor () {

    const dispatch = useDispatch();
    const {bun, ingredients} = useSelector(store => store.burger);

    const onDrop = (ingredient) => {
        if (ingredient.type === 'bun') {
           dispatch(addBun(ingredient));
        } else {
           dispatch(addIngredient(ingredient));
        }
    }

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            onDrop(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return (
        <section className={`${burgerConstructor.main}`}>
            <div className={`${burgerConstructor.dropTarget} ${isHover ? burgerConstructor.dropHover : ''}`} ref={dropTarget}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
            />
            <section className={`${burgerConstructor.scrollWrap} scroller`}>
                <BurgerStructure/>
            </section>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
            />
            </div>
            <OrderButton/>
        </section>
    )
}

export default BurgerConstructor;
