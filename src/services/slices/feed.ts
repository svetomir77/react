import {createSlice} from '@reduxjs/toolkit';
import {TFeedState, TIngredient, TIngredientsUid, TIngredientUid} from "../../utils/types";

const initialState:TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    connecting: false,
    online: false,
    connectionError: null,
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        wsConnect(state, action) {
            state.connecting = true;
        },
        wsDisconnect(state) {
            state.online = false;
        },
        onOpen(state, action) {
            state.connecting = false;
            state.online = true;
        },
        onClose(state, action) {
            state.online = false;
        },
        onError(state, action) {
            state.online = false;
            state.connecting = false;
        },
        onMessage(state, action) {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    },
});

export const feedActions = feedSlice.actions;
export default feedSlice.reducer;
