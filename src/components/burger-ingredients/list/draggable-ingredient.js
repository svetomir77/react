import React, {useState} from "react";
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import draggableIngredient from "./draggable-ingredient.module.css";
import { useDrag } from "react-dnd";

function DraggableIngredient (props) {
    const {ingredient, onClickCapture} = props;

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
            {ingredient.count && <Counter count={0} size="default" />}
        </li>
    );
}

export default DraggableIngredient;
