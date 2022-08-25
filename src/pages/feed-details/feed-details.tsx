import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "../../index";
import {Center} from "../../components/center/center";
import styles from "./feed-details.module.css";
import {OrderList} from "../../components/order-list/order-list";
import {fetchIngredients} from "../../services/slices/ingredients";
import {feedActions} from "../../services/slices/feed";
import {FEED_URL} from "../../utils/api";

export const FeedDetailsPage: FC = (order) => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const {ingredientsData, orders, selected} = useSelector((store) => {
        return {ingredientsData: store.ingredients, orders: store.feed.orders, selected: store.feed.selected}
    });

    const {
        items: ingredients,
        isLoading,
        hasError,
    } = ingredientsData;

    // загрузка ингридиентов
    useEffect(() => {
        if (!ingredients.length) {
            dispatch(fetchIngredients());
            dispatch(feedActions.wsConnect(`${FEED_URL}/all`));

            return () => {
                dispatch(feedActions.wsDisconnect());
                dispatch(feedActions.clearState());
            }
        }
    }, []);

    // получение текущего данных текущего заказа
    useEffect(() => {
        if (orders && ingredients) {
            dispatch(feedActions.select({id: id, orders: orders, ingredients: ingredients}));
        }
    }, [ingredients, orders, dispatch, id]);

    return (
        <Center className={styles.main}>
            {isLoading && <div className="centerText">Загрузка...</div>}
            {hasError && <div className="centerText error">{hasError}</div>}
            {!isLoading &&
            !hasError &&
            selected &&
            <OrderList order={selected}/>}
        </Center>
    );
}
