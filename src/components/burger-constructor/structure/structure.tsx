import burgerStructure from "./structure.module.css";
import {BurgerDraggableIngredient} from "./draggable-ingredient/draggable-ingredient";
import {FC} from "react";
import {useSelector} from "../../../index";
import {TIngredientUid} from "../../../utils/types";

export const BurgerStructure: FC = () => {
    const ingredients = useSelector((store) => store.burger.ingredients);

    return (
        <>
            {
                ingredients.length > 0 ? ingredients.map((ingredient: TIngredientUid) => (
                        <BurgerDraggableIngredient key={ingredient.uuid} ingredient={ingredient}/>
                    )) :
                    <span
                        className={`${burgerStructure.defaultText} text text_type_main-default`}>Добавьте ингридиенты</span>
            }
        </>
    )
}
