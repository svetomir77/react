import {createSlice} from '@reduxjs/toolkit';
import {TIngredient} from "../../utils/types";

type TIngredientDetailsState = {
    ingredient: TIngredient | null;
}
const initialState:TIngredientDetailsState = {
    ingredient: null,
};

const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState,
    reducers: {
        addIngredient(state, action) {
            state.ingredient = action.payload;
        },
        removeIngredient(state) {
            state.ingredient = null;
        },
    },
});

export const {
    addIngredient,
    removeIngredient,
} = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
