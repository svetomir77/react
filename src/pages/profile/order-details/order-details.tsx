import {useParams} from "react-router-dom";
import styles from "../profile.module.css";
import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "../../../services/store";
import {feedActions} from "../../../services/slices/feed";
import {FEED_URL} from "../../../utils/api";
import {OrderList} from "../../../components/order-list/order-list";
import {cleanToken} from "../../../utils/common";
import {Center} from "../../../components/center/center";

export const ProfileOrderDetailsPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const {ingredientsData, orders, selected, accessToken} = useSelector((store) => {
        return {
            ingredientsData: store.ingredients,
            orders: store.feed.orders,
            selected: store.feed.selected,
            accessToken: store.auth.accessToken
        }
    });

    const {
        items: ingredients,
        isLoading,
        hasError,
    } = ingredientsData;

    useEffect(() => {
        const token = cleanToken(accessToken);
        dispatch(feedActions.wsConnect(`${FEED_URL}?token=${token}`));

        return () => {
            dispatch(feedActions.wsDisconnect());
            dispatch(feedActions.clearState());
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
