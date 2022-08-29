import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragSourceMonitor, useDrag} from "react-dnd";
import burgerDraggableIngredient from "./draggable-ingredient.module.css";
import {removeIngredient} from "../../../../services/slices/burger";
import {TBurgerIngredientUidProps} from "../../../../utils/types";
import {FC} from "react";
import {useDispatch} from "../../../../services/store";

export const BurgerDraggableIngredient: FC<TBurgerIngredientUidProps> = ({ingredient}) => {
    const dispatch = useDispatch();
    const onClose = (uuid: string) => {
        dispatch(removeIngredient(uuid));
    }

    const [{isDrag}, dragRef] = useDrag({
        type: 'burgerIngredient',
        item: ingredient,
        collect: (monitor: DragSourceMonitor) => ({
            isDrag: monitor.isDragging(),
        })
    });

    return (
        <li className={`${burgerDraggableIngredient.item} ${isDrag ? burgerDraggableIngredient.dragging : ''}`}
            ref={dragRef} data-uuid={ingredient.uuid}>
            <span className={burgerDraggableIngredient.drag}><DragIcon type="primary"/></span>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={onClose.bind(this, ingredient.uuid)}
            />
        </li>
    );
}
