import React from "react";
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientList from "./list.module.css";

function IngredientList (props) {
    return (
        <ul className={`${ingredientList.wrap} pt-6 pb-8`}>
            {props.data.map((item, index)=>(
                <li key={item._id} className={`${ingredientList.item} mr-3 ml-3 mt-4 mb-4`}>
                    <img src={item.image} alt={item.text}/>
                    <span className={`${ingredientList.price} text text_type_digits-default p-1`}><span className={ingredientList.priceNum}>{item.price}</span> <CurrencyIcon type="primary" /></span>
                    <span className={`${ingredientList.text} text text_type_main-default`}>{item.name}</span>
                    <Counter count={1} size="default" />
                </li>
            ))}
        </ul>
    );
}

export default IngredientList;
