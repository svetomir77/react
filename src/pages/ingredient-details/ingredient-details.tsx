import {Center} from "../../components/center/center";
import {useParams} from 'react-router-dom';
import React, {FC, useEffect} from "react";
import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";
import {selectIngredient} from "../../services/slices/ingredients";
import styles from './ingredient-details.module.css';
import {TIngredient} from "../../utils/types";
import {useDispatch, useSelector} from "../../services/store";

export const IngredientDetailsPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const {
        items: ingredients,
        isLoading,
        hasError,
        selected: ingredient
    } = useSelector((store) => store.ingredients);

    // получение текущего ингридиента
    useEffect(() => {
        const [selected] = ingredients && ingredients.filter((item: TIngredient) => item._id === id);
        dispatch(selectIngredient(selected));
    }, [ingredients, dispatch, id]);

    return (
        <Center className={styles.main}>
            {isLoading && <div className="centerText">Загрузка...</div>}
            {hasError && <div className="centerText error">{hasError}</div>}
            {!isLoading &&
            !hasError &&
            ingredient &&
            <IngredientDetails ingredient={ingredient}/>}
        </Center>
    );
}
