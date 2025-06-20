import { configureStore } from "@reduxjs/toolkit";
import CheckDateReducer from './features/todo/CheckDateSlice';
import UserValuesSlice from "./features/todo/GetInputDate";

export const store = configureStore({
    reducer:{
        checkDate: CheckDateReducer,
        UserDate: UserValuesSlice,
    },   
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;