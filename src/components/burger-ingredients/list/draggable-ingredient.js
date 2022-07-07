import React from "react";
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import draggableIngredient from "./draggable-ingredient.module.css";
import { useDrag } from "react-dnd";
import {useSelector} from "react-redux";
import ingredientTypes from "../../../utils/ingredient-types";

function DraggableIngredient (props) {
    const {ingredient, onClickCapture} = props;
    const { ingredients } = useSelector(store => store.burger);
    const count = ingredients.reduce((acc, current) => acc + (current._id === ingredient._id), 0);

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <li className={`${draggableIngredient.item} mr-3 ml-3 mt-4 mb-4 ${isDrag ? draggableIngredient.dragging : ''}`} onClickCapture={onClickCapture} ref={dragRef}>
            <img src={ingredient.image} alt={ingredient.text}/>
            <span className={`${draggableIngredient.price} text text_type_digits-default p-1`}><span className={draggableIngredient.priceNum}>{ingredient.price}</span> <CurrencyIcon type="primary" /></span>
            <span className={`${draggableIngredient.text} text text_type_main-default`}>{ingredient.name}</span>
            {count ? <Counter count={count} size="default" /> : ''}
        </li>
    );
}
DraggableIngredient.propTypes = {
    ingredient: ingredientTypes.isRequired
}

export default DraggableIngredient;
