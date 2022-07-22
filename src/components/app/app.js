import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {HomePage} from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import ProfilePage from "../../pages/profile/profile";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfileOrdersPage from "../../pages/profile/orders/orders";
import FeedPage from "../../pages/feed/feed";
import {ProtectedRoute} from '../protected-route';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import React from "react";
import AppHeader from "../app-header/app-header";


function App() {
    const location = useLocation();
    const ingredient = location.state && location.state.ingredient;
    const history = useHistory();
    const back = e => {
        e && e.stopPropagation();
        history.goBack();
    };
    return (
        <>
            <div className='page'>
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
                        <IngredientDetailsPage/>
                    </Route>
                    <Route path="/feed" exact={true}>
                        <FeedPage/>
                    </Route>
                </Switch>
            </div>
            {ingredient && <Route path="/ingredients/:id" exact={true}>
                <Modal width={720} height={540} title="Детали ингредиента" onClose={back}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            </Route>}
        </>
    );
}

export default App;
