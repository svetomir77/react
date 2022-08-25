import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";
import {RegisterPage} from "../../pages/register/register";
import {IngredientDetailsPage} from "../../pages/ingredient-details/ingredient-details";
import {ProfilePage} from "../../pages/profile/profile";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {ProfileOrdersPage} from "../../pages/profile/orders/orders";
import {FeedPage} from "../../pages/feed/feed";
import {ProtectedRoute} from "../protected-route";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {Modal} from "../modal/modal";
import React, {FC} from "react";
import {AppHeader} from "../app-header/app-header";
import {LocationState, TOnClose} from "../../utils/types";
import {ProfileOrderDetailsPage} from "../../pages/profile/order-details/order-details";
import {FeedDetailsPage} from "../../pages/feed-details/feed-details";
import {OrderList} from "../order-list/order-list";

export const App: FC = () => {
    const location = useLocation();
    const state = location.state as LocationState;
    const ingredient = state?.ingredient;
    const order = state?.order;
    const history = useHistory();
    const back: TOnClose = (e) => {
        e && e.stopPropagation();
        history.goBack();
    };
    return (
        <>
            <div className="page">
                <AppHeader/>
                <Switch>
                    <Route path="/" exact={true}>
                        <HomePage/>
                    </Route>
                    <Route path="/login" exact={true}>
                        <LoginPage/>
                    </Route>
                    <Route path="/register" exact={true}>
                        <RegisterPage/>
                    </Route>
                    <Route path="/forgot-password" exact={true}>
                        <ForgotPasswordPage/>
                    </Route>
                    <Route path="/reset-password" exact={true}>
                        <ResetPasswordPage/>
                    </Route>
                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <ProfileOrdersPage/>
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" exact={true}>
                        {ingredient ? <HomePage/> : <IngredientDetailsPage/>}
                    </Route>
                    <Route path="/feed" exact={true}>
                        <FeedPage/>
                    </Route>
                    <Route path="/feed/:id" exact={true}>
                        {order ? <FeedPage/> : <FeedDetailsPage/>}
                    </Route>
                    <ProtectedRoute path="/profile/orders/:id" exact={true}>
                        {order ? <ProfileOrdersPage/> : <ProfileOrderDetailsPage/>}
                    </ProtectedRoute>
                </Switch>
            </div>
            {ingredient && (
                <Route path="/ingredients/:id" exact={true}>
                    <Modal
                        width={720}
                        height={540}
                        title="Детали ингредиента"
                        onClose={back}
                    >
                        <IngredientDetails ingredient={ingredient}/>
                    </Modal>
                </Route>
            )}
            {order && (
                <Route path={['/feed/:id', '/profile/orders/:id']} exact={true}>
                    <Modal
                        width={920}
                        height={740}
                        onClose={back}
                    >
                        <OrderList order={order}/>
                    </Modal>
                </Route>
            )}
        </>
    );
}
