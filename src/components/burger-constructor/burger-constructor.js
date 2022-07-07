import React, {useContext, useMemo, useReducer} from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from "./burger-constructor.module.css";
import BurgerStructure from "./structure/structure";
import OrderButton from './order-button/order-button';
import { IngredientsContext, BurgerContext } from "../../services/user-context";

function BurgerConstructor () {
    const allIngredients = useContext(IngredientsContext);

    //временно, пока не сделан D&D - булка + случайные 5 ингридиентов
    const bun = useMemo(() => allIngredients.find(item => item.type === 'bun'), [allIngredients]);
    const shuffled = useMemo(() => allIngredients.sort(() => 0.5 - Math.random()), [allIngredients]);
    const ingredients = useMemo(() => shuffled.filter(item => item.type !== 'bun').slice(0, 4), [shuffled]);

    const initialState = { orderNum: null, total: 0 };

    function reducer(state, action) {
        switch (action.type) {
            case "total":
                let sum = 0;
                const {ingredients, bun} = action;
                if (ingredients && bun) {
                    sum += (ingredients.reduce((acc, current) => acc + Number(current.price), 0)) || 0;
                    sum += Number(bun.price) * 2;
                }

                return { ...state, total: sum };
            case "order":
                return { ...state, orderNum: action.orderNum };
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }
    const orderReducer = useReducer(reducer, initialState);

    return (
        <BurgerContext.Provider value={{ingredients, bun, orderReducer}}>
        <section className={burgerConstructor.main}>
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
            <OrderButton/>
        </section>
        </BurgerContext.Provider>
    )
}

export default BurgerConstructor;
