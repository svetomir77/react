import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "../../index";
import {Center} from "../../components/center/center";
import styles from "./feed-details.module.css";
import {OrderList} from "../../components/order-list/order-list";

export const FeedDetailsPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    // const {
    //     items: ingredients,
    //     isLoading,
    //     hasError,
    //     selected: ingredient
    // } = useSelector((store) => store.ingredients);

    // загрузка ингридиентов
    useEffect(() => {
        // dispatch(fetchIngredients());
    }, []);

    // получение текущего ингридиента
    // useEffect(() => {
    //     const [selected] = ingredients && ingredients.filter((item: TIngredient) => item._id === id);
    //     dispatch(selectIngredient(selected));
    // }, [ingredients, dispatch, id]);

    return (
        <Center className={styles.main}>
            {/*{isLoading && <div className="centerText">Загрузка...</div>}*/}
            {/*{hasError && <div className="centerText error">{hasError}</div>}*/}
            {/*{!isLoading &&*/}
            {/*!hasError &&*/}
            {/*ingredient &&*/}
            <OrderList/>
        </Center>
    );
}
