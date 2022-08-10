import {createSlice} from '@reduxjs/toolkit';

const initialState = {
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
