import React from "react";
import ingredientList from "./list.module.css";
import DraggableIngredient from "./draggable-ingredient/draggable-ingredient";
import {Link} from "react-router-dom";

function IngredientList(props) {
    return (
        <>
            <ul className={`${ingredientList.wrap} pt-6 pb-8`}>
                {props.ingredients.map((ingredient, index) => (
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

export default IngredientList;
