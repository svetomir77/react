import {combineReducers} from 'redux';
import orderReducer from './slices/order-details';
import ingredientsReducer from './slices/ingredients';
import burgerReducer from './slices/burger';
import ingredientDetailsReducer from './slices/ingredient-details';
import profileReducer from './slices/profile';
import authReducer from './slices/auth';

const rootReducer = combineReducers({
    order: orderReducer,
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    ingredientDetails: ingredientDetailsReducer,
    profile: profileReducer,
    auth: authReducer,
});

export default rootReducer;
