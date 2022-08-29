import {createSlice} from '@reduxjs/toolkit';
import addUUID from "../../utils/uuid";
import {TIngredient, TIngredientsUid, TIngredientUid} from "../../utils/types";

const initialState:TBurgerState = {
    ingredients: [],
    bun: {
        price: 0,
        image: '',
        name: '',
        _id: '',
    },
};

type TBurgerState = {
    ingredients: TIngredientsUid;
    bun: TIngredientUid | Pick<TIngredient, 'price' | 'image' | 'name' | '_id'>;
}

const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addIngredient(state, action) {
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
        changeIngredientPosition(state, action) {
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
