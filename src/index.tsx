import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import {App} from './components/app/app';
import reportWebVitals from './report_web_vitals';
import thunkMiddleware from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'

import rootReducer from './services/reducers';
import {Provider, TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from "react-redux";

const isProductionEnv = process.env.NODE_ENV === 'production';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware) ,
    devTools: !isProductionEnv,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <Router>
            {(isProductionEnv && (
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            )) || <App/>}
        </Router>
    </Provider>
);

const modalContainer = document.createElement('div');
modalContainer.id = 'react-modals';
document.body.appendChild(modalContainer);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
