import React, {FC} from "react";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import draggableIngredient from "./draggable-ingredient.module.css";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {TBurgerIngredientProps, TIngredientUid} from "../../../../utils/types";

export const DraggableIngredient: FC<TBurgerIngredientProps> = ({ingredient}) => {
    const {ingredients, bun} = useSelector((store: any) => store.burger);
    const count = (ingredient.type === 'bun' && bun._id === ingredient._id) ? 2
        : ingredients.reduce((acc: number, current: TIngredientUid) => acc + Number(current._id === ingredient._id), 0);

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor: DragSourceMonitor) => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <li className={`${draggableIngredient.item} mr-3 ml-3 mt-4 mb-4 ${isDrag ? draggableIngredient.dragging : ''}`}
            ref={dragRef}>
            <img src={ingredient.image} alt={ingredient.name}/>
            <span className={`${draggableIngredient.price} text text_type_digits-default p-1`}><span
                className={draggableIngredient.priceNum}>{ingredient.price}</span> <CurrencyIcon type="primary"/></span>
            <span className={`${draggableIngredient.text} text text_type_main-default`}>{ingredient.name}</span>
            {count ? <Counter count={count} size="default"/> : ''}
        </li>
    );
}
