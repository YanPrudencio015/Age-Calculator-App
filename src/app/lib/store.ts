import { configureStore } from "@reduxjs/toolkit";
import CheckDateReducer from './features/todo/CheckDateSlice';
import UserValuesSlice from "./features/todo/GetInputDate";
import  UserTimeLivedSlice  from "./features/todo/UserTimeLiveSlice";
import  checkDateErrorSlice  from "./features/todo/CanCalcTime";
export const store = configureStore({
    reducer:{
        checkDate: CheckDateReducer,
        UserDate: UserValuesSlice,
        TimeLived: UserTimeLivedSlice,
        checkError: checkDateErrorSlice, // check if there are error on user's date before calculate it.
    },   
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;