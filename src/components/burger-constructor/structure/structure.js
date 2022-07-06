import React, {useContext} from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStructure from "./structure.module.css";
import {useSelector} from "react-redux";

function BurgerStructure () {
    const ingredients = useSelector(store => store.burger.ingredients);
    return (
        ingredients.length > 0 ? ingredients.map((item, index)=>(
            <li className={burgerStructure.item} key={item.uuid}>
                <span className={burgerStructure.drag}><DragIcon type="primary"/></span>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />
            </li>
        )) : <span className={`${burgerStructure.defaultText} text text_type_main-default`}>Добавьте ингридиенты</span>);
}

export default BurgerStructure;
