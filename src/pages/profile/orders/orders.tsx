import {Link, useHistory} from "react-router-dom";
import styles from "../profile.module.css";
import React, {FC, useCallback, useEffect} from "react";
import {OrderInfo} from "../../../components/order-info/order-info";
import {useDispatch, useSelector} from "../../../index";
import {feedActions} from "../../../services/slices/feed";
import {FEED_URL} from "../../../utils/api";
import {cleanToken} from "../../../utils/common";
import {useAuth} from "../../../services/auth";

export const ProfileOrdersPage: FC = () => {
    const feedUrl = 'wss://norma.nomoreparties.space/orders';
    const dispatch = useDispatch();
    const {feed, accessToken} = useSelector((store) => {
        return {feed: store.feed, accessToken: store.auth.accessToken}
    });
    const {
        orders,
        total,
        totalToday,
        connecting,
        online,
        connectionError
    } = feed;
    const auth = useAuth();
    const history = useHistory();
    const logout = useCallback(
        () => {
            auth.signOut().then(() => {
                history.replace({pathname: '/login'});
            });
        },
        [auth, history]
    );
    useEffect(() => {
        const token = cleanToken(accessToken);
        dispatch(feedActions.wsConnect(`${FEED_URL}?token=${token}`));
        return () => {
            dispatch(feedActions.wsDisconnect());
            dispatch(feedActions.clearState());
        }
    }, []);

    return (
        <section className={styles.main}>
            <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>
                <section className={`${styles.link} text_color_inactive`}><Link to='/profile'>Профиль</Link>
                </section>
                <h3 className={`${styles.header} text_type_main-medium`}>История заказов</h3>
                <section className={`${styles.link} text_color_inactive`}><a onClick={logout}
                                                                             className={styles.rawLink}>Выход</a>
                </section>
                <section className={`${styles.info} mt-20 text text_type_main-small text_color_inactive`}>
                    В этом разделе вы можете посмотреть свою историю заказов
                </section>
            </section>
            <section className={`${styles.colRight} scroller`}>
                {orders.map((order) => (
                    <Link key={order._id}
                          to={{
                              pathname: `/profile/orders/${order.number}`,
                              state: {order: order}
                          }}
                    >
                        <OrderInfo key={order._id} order={order} showStatus={true}/>
                    </Link>
                ))}
            </section>
        </section>
    );
}
