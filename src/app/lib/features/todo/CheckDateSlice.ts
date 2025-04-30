'use client';
import { createSlice } from "@reduxjs/toolkit";

interface CheckDate {
    value: boolean;
}

const initialState: CheckDate = {
    value: false
}

export const checkDateSlice = createSlice({
    name:'checkDate',
    initialState,
    reducers:{
        turnTrue: (state)=>{
            state.value = true;
        },
        returnFalse: (state)=>{
            state.value = false;
        }
    }
})

export const { turnTrue, returnFalse } = checkDateSlice.actions;
export default checkDateSlice.reducer;