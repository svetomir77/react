import React from "react";
import ingredientList from "./list.module.css";
import IngredientDetails from '../../ingredient-details/ingredient-details';
import Modal from "../../modal/modal";
import DraggableIngredient from "./draggable-ingredient/draggable-ingredient";
import {addIngredient, removeIngredient} from "../../../services/slices/ingredient-details";
import {useDispatch, useSelector} from "react-redux";

function IngredientList(props) {
    const dispatch = useDispatch();
    const {ingredient} = useSelector(store => store.ingredientDetails);

    const handleOpenModal = (ingredient, e) => {
        dispatch(addIngredient(ingredient));
        e.stopPropagation();
    }
    const handleCloseModal = () => {
        dispatch(removeIngredient());
    }

    return (
        <>
            <ul className={`${ingredientList.wrap} pt-6 pb-8`}>
                {props.ingredients.map((ingredient, index) => (
                    <DraggableIngredient key={ingredient._id} onClickCapture={handleOpenModal.bind(this, ingredient)}
                                         ingredient={ingredient}/>
                ))}
            </ul>
            {ingredient && <Modal width={720} height={540} title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails ingredient={ingredient}/>
            </Modal>}
        </>
    );
}

export default IngredientList;
