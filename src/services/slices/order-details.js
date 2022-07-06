import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    num: null,
    total: 0,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getTotal(state, action) {
            let total = 0;
            const {ingredients, bun} = action.payload;
            total += (ingredients.reduce((acc, current) => acc + Number(current.price), 0)) || 0;
            total += Number(bun.price) * 2;
            state.total = total;
        },
        getOrderNum(state, action) {
            state.num = action.payload;
        },
    },
});

export const {
    getTotal,
    getOrderNum,
} = orderSlice.actions;
export default orderSlice.reducer;
