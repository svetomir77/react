import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadIngredients} from '../../utils/api';

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetch',
    async (params, {rejectWithValue}) => {
        try {
            const response = await loadIngredients();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {items: [], isLoading: false, hasError: null, selected: null},
    reducers: {
        selectIngredient(state, action) {
            state.selected = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
                state.hasError = null;
            })
            .addCase(fetchIngredients.rejected, (state: any, action) => {
                state.isLoading = false;
                state.hasError = action.payload;
            });
    },
});
export const {
    selectIngredient,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
