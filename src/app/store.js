import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'

import accountSlice from "../slices/accountSlice";
import banksSlice from "../slices/banksSlice";
import { persistReducer, persistStore } from "redux-persist";

const accountsReducer = accountSlice.reducer;
const banksreducer = banksSlice.reducer;

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        accounts:accountsReducer,
        banks:banksreducer
    })
)

export const store = configureStore({
    reducer:persistedReducer
});

export const persistor = persistStore(store);