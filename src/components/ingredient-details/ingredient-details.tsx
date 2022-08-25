import styles from './ingredient-details.module.css';
import {TIngredient} from "../../utils/types";
import React, {FC, useEffect} from "react";
import {addIngredient, removeIngredient} from "../../services/slices/ingredient-details";
import {useDispatch} from "../../index";

export const IngredientDetails: FC<{ ingredient: TIngredient }> = ({ingredient}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addIngredient(ingredient));
        return () => {
            dispatch(removeIngredient());
        }
    }, []);

    return (
        <>
            <img src={ingredient.image_large} alt={ingredient.name}/>
            <section className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</section>
            <ul className={`${styles.container} text text_type_main-default text_color_inactive`}>
                <li><p className='pb-3'>Каллории, ккал</p><p
                    className='text_type_digits-default'>{ingredient.calories}</p></li>
                <li><p className='pb-3'>Белки, г</p><p className='text_type_digits-default'>{ingredient.proteins}</p>
                </li>
                <li><p className='pb-3'>Жиры, г</p><p className='text_type_digits-default'>{ingredient.fat}</p></li>
                <li><p className='pb-3'>Углеводы, г</p><p
                    className='text_type_digits-default'>{ingredient.carbohydrates}</p></li>
            </ul>

        </>
    );
}
