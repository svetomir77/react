import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {feedActions} from "./slices/feed";
import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from "react-redux";
export const isProductionEnv = process.env.NODE_ENV === 'production';
export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware, socketMiddleware(feedActions)) ,
    devTools: !isProductionEnv,
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
