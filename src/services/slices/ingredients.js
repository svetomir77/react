import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { loadIngredients } from '../../utils/api';

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetch',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await loadIngredients();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: { items: [], isLoading: false, hasError: null },
    reducers: {
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
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = action.payload;
            });
    },
});

export default ingredientsSlice.reducer;
