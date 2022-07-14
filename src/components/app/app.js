import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './app.module.css';
import {fetchIngredients} from "../../services/slices/ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {HomePage} from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import ProfilePage from "../../pages/profile/profile";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>
                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>
                <Route path="/register" exact={true}>
                    <RegisterPage />
                </Route>
                <Route path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password" exact={true}>
                    <ResetPasswordPage />
                </Route>
                <Route path="/profile" exact={true}>
                    <ProfilePage />
                </Route>
                <Route path="/ingredient-details/:id" exact={true}>
                    <IngredientDetailsPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
