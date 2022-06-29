import React, {useContext} from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStructure from "./structure.module.css";
import {BurgerContext} from "../../../utils/user-context";

function BurgerStructure () {
    const { list } = useContext(BurgerContext);
    return (
        list.map((item, index)=>(
            <li className={burgerStructure.item} key={item._id}>
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
