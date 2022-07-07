import React, {useContext} from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStructure from "./structure.module.css";
import {BurgerContext} from "../../../services/user-context";
import generateUUID from "../../../utils/uuid";

function BurgerStructure () {
    const { ingredients } = useContext(BurgerContext);
    const ingredientsWithUuid = generateUUID(ingredients, '_id');
    return (
        ingredientsWithUuid.map((item, index)=>(
            <li className={burgerStructure.item} key={item.uuid}>
                <span className={burgerStructure.drag}><DragIcon type="primary"/></span>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />
            </li>
        ))
    );
}

export default BurgerStructure;
