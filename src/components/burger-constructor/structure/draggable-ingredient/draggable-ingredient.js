import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import burgerDraggableIngredient from "./draggable-ingredient.module.css";
import {removeIngredient} from "../../../../services/slices/burger";
import ingredientTypes from "../../../../utils/ingredient-types";

function BurgerDraggableIngredient(props) {
    const {ingredient} = props;
    const dispatch = useDispatch();
    const onClose = (uuid) => {
        dispatch(removeIngredient(uuid));
    }

    const [{isDrag}, dragRef] = useDrag({
        type: 'burgerIngredient',
        item: ingredient,
        collect: (monitor) => ({
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

BurgerDraggableIngredient.propTypes = {
    ingredient: ingredientTypes.isRequired
}

export default BurgerDraggableIngredient;
