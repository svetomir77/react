import React, {FC} from "react";
import ingredientList from "./list.module.css";
import {DraggableIngredient} from "./draggable-ingredient/draggable-ingredient";
import {Link} from "react-router-dom";
import {TIngredientsUid, TIngredientUid} from "../../../utils/types";

export const IngredientList: FC<{ ingredients: TIngredientsUid }> = ({ingredients}) => {
    return (
        <>
            <ul className={`${ingredientList.wrap} pt-6 pb-8`}>
                {ingredients.map((ingredient: TIngredientUid) => (
                    <Link key={ingredient._id}
                          to={{
                              pathname: `/ingredients/${ingredient._id}`,
                              state: {ingredient: ingredient}
                          }}
                    >
                        <DraggableIngredient ingredient={ingredient}/>
                    </Link>
                ))}
            </ul>
        </>
    );
}
