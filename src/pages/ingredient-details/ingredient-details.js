import Center from "../../components/center/center";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "../../components/app-header/app-header";
import React, {useEffect} from "react";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {fetchIngredients, selectIngredient} from "../../services/slices/ingredients";
import styles from './ingredient-details.module.css';

function IngredientDetailsPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {items: ingredients, isLoading, hasError, selected: ingredient} = useSelector(store => store.ingredients);

    // загрузка ингридиентов
    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    // получение текущего ингридиента
    useEffect(() => {
        const [selected] = ingredients && ingredients.filter(item => item._id === id);
        dispatch(selectIngredient(selected));
    }, [ingredients, dispatch, id]);

    return (
        <div className='page'>
            <AppHeader/>
            <Center className={styles.main}>
                {isLoading && <div className="centerText">Загрузка...</div>}
                {hasError && <div className="centerText error">{hasError}</div>}
                {!isLoading &&
                !hasError &&
                ingredient &&
                <IngredientDetails ingredient={ingredient}/>}
            </Center>
        </div>
    );
}

export default IngredientDetailsPage;
