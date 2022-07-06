import { createSlice } from '@reduxjs/toolkit';
import addUUID from "../../utils/uuid";

const initialState = {
    ingredients: [],
    bun: {
        price: 0,
        image: '',
        name: '',
    },
};

const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addIngredient(state, action) {
            const ingredient = action.payload;
            const burgerIngredient = addUUID(state.ingredients, {...ingredient}, '_id');
            state.ingredients.push(burgerIngredient);
        },
        removeIngredient(state, action) {

        },
        addBun(state, action) {
            state.bun = action.payload;
        },
        changeIngredientPosition(state, action) {

        }
    },
});

export const {
    addIngredient,
    removeIngredient,
    addBun,
    changeIngredientPosition
} = burgerSlice.actions;
export default burgerSlice.reducer;
