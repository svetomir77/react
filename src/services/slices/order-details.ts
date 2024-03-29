import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postOrder} from "../../utils/api";
import {TIngredientUid, TOrderIngredients, TToken} from "../../utils/types";

export const placeOrder = createAsyncThunk(
    'order/place',
    async (params: TToken & { body: TOrderIngredients }, {rejectWithValue}) => {
        try {
            const response = await postOrder(params);
            return response.order.number;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    num: null,
    total: 0,
    isLoading: false,
    hasError: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getTotal(state, action) {
            let total = 0;
            const {ingredients, bun} = action.payload;
            total += (ingredients.reduce((acc: number, current: TIngredientUid) => acc + Number(current.price), 0)) || 0;
            total += Number(bun.price) * 2;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.num = action.payload;
                state.isLoading = false;
                state.hasError = null;
            })
            .addCase(placeOrder.rejected, (state:any, action) => {
                state.isLoading = false;
                state.hasError = action.payload;
            });
    },
});

export const {
    getTotal,
} = orderSlice.actions;
export default orderSlice.reducer;
