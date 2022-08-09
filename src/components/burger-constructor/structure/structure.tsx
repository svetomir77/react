import burgerStructure from "./structure.module.css";
import {useSelector} from "react-redux";
import {BurgerDraggableIngredient} from "./draggable-ingredient/draggable-ingredient";
import {TIngredientUid} from "../../../utils/types";
import {FC} from "react";

export const BurgerStructure:FC = () => {
    const ingredients = useSelector((store:any) => store.burger.ingredients);

    return (
        ingredients.length > 0 ? ingredients.map((ingredient:TIngredientUid) => (
                <BurgerDraggableIngredient key={ingredient.uuid} ingredient={ingredient}/>
            )) :
            <span className={`${burgerStructure.defaultText} text text_type_main-default`}>Добавьте ингридиенты</span>);
}
