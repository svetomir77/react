import {Route, Switch} from "react-router-dom";
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


function App() {
    return (
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
    );
}

export default App;
