import { configureStore } from "@reduxjs/toolkit";
import CheckDateReducer from './features/todo/CheckDateSlice';

export const store = configureStore({
    reducer:{
        checkDate: CheckDateReducer,
    },   
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;