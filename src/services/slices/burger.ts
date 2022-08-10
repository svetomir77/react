import {createSlice} from '@reduxjs/toolkit';
import addUUID from "../../utils/uuid";
import {TIngredientUid} from "../../utils/types";

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
        addIngredient(state: any, action) {
            const {ingredient, before} = action.payload;
            const beforeIndex = state.ingredients.findIndex((item: TIngredientUid) => item.uuid === before);
            const burgerIngredient = addUUID(state.ingredients, {...ingredient}, '_id');

            if (beforeIndex >= 0) {
                state.ingredients.splice(beforeIndex, 0, burgerIngredient);
            } else {
                state.ingredients.push(burgerIngredient);
            }
        },
        removeIngredient(state, action) {
            state.ingredients = state.ingredients.filter((item: TIngredientUid) => item.uuid !== action.payload);
        },
        addBun(state, action) {
            state.bun = action.payload;
        },
        changeIngredientPosition(state: any, action) {
            const {ingredient, before} = action.payload;
            if (before !== ingredient.uuid) {
                const removeCurrentIndex = state.ingredients.findIndex((item: TIngredientUid) => item.uuid === ingredient.uuid);
                state.ingredients.splice(removeCurrentIndex, 1);

                if (before) {
                    const insertBeforeIndex = state.ingredients.findIndex((item: TIngredientUid) => item.uuid === before);
                    state.ingredients.splice(insertBeforeIndex, 0, ingredient);
                } else {
                    state.ingredients.push(ingredient);
                }
            }
        },
        removeAllIngredients: () => initialState,
    },
});

export const {
    addIngredient,
    removeIngredient,
    addBun,
    changeIngredientPosition,
    removeAllIngredients,
} = burgerSlice.actions;
export default burgerSlice.reducer;
