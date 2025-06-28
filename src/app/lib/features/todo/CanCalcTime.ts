'use client';
import { createSlice } from "@reduxjs/toolkit";


// check if thare aren't arror on user's date before try to calculate  

interface IsErrorToCalc {
    value: boolean;
}

const initialState: IsErrorToCalc = {
    value: true
}

export const checkDateErrorSlice = createSlice({
    name:'IsErrorToCalc',
    initialState,
    reducers:{
        hasError: (state)=>{
            state.value = true;
        },
        NoError: (state)=>{
            state.value = false;
        }
    }
})

export const { hasError, NoError } = checkDateErrorSlice.actions;
export default checkDateErrorSlice.reducer;