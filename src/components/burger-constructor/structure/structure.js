import burgerStructure from "./structure.module.css";
import {useSelector} from "react-redux";
import BurgerDraggableIngredient from "./draggable-ingredient/draggable-ingredient";

function BurgerStructure() {
    const ingredients = useSelector(store => store.burger.ingredients);

    return (
        ingredients.length > 0 ? ingredients.map((ingredient, index) => (
                <BurgerDraggableIngredient key={ingredient.uuid} ingredient={ingredient}/>
            )) :
            <span className={`${burgerStructure.defaultText} text text_type_main-default`}>Добавьте ингридиенты</span>);
}

export default BurgerStructure;
